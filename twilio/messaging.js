// twilio/messaging.js
import "dotenv/config";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const ACTIVE_STATUSES = new Set(["queued", "accepted", "scheduled", "sending"]);
const SUCCESS_STATUSES = new Set(["sent", "delivered"]);

const REQUIRED_ENV = ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN"];
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID?.trim();
let cachedAccountMeta = null;

function normalizeNumber(label, rawValue) {
  if (!rawValue) {
    console.error(
      `Twilio SMS aborted: missing ${label} in environment variables (.env)`
    );
    return null;
  }

  const value = rawValue.trim();
  if (!value.startsWith("+")) {
    console.warn(
      `Twilio ${label} should be in E.164 format (e.g. +14045551234). Got "${value}".`
    );
  }

  return value;
}

function describeTwilioError(code) {
  switch (code) {
    case 21219:
      return "Twilio flagged the recipient number as unverified. Confirm the account is fully upgraded and the destination phone is not blocked.";
    case 30003:
      return "Carrier rejected the SMS. Double-check the recipient handset can receive SMS and that the number is correct.";
    case 30004:
      return "Recipient device is unreachable. Verify the handset has cell service.";
    case 30007:
      return "Carrier filtered the message content. Try simplifying the body text.";
    case 30008:
      return "Delivered to carrier but no confirmation from device. Often caused by blocked numbers or unreachable devices.";
    case 30032:
      return "Carrier rejected the message for A2P policy/compliance reasons (often 10DLC registration or forbidden content). Verify your brand/campaign registration and review the message body.";
    default:
      return null;
  }
}

async function waitForFinalStatus(messageSid, timeoutMs = 20000, intervalMs = 1500) {
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    const details = await client.messages(messageSid).fetch();
    if (!ACTIVE_STATUSES.has(details.status)) {
      return details;
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  return client.messages(messageSid).fetch();
}

async function ensureAccountMeta() {
  if (cachedAccountMeta) {
    return cachedAccountMeta;
  }

  try {
    cachedAccountMeta = await client.api
      .accounts(client.accountSid)
      .fetch();
    if (cachedAccountMeta?.type?.toLowerCase() === "trial") {
      console.warn(
        "Twilio still reports this project as a trial account; unverified recipients may be rejected."
      );
    }
  } catch (fetchErr) {
    console.warn(
      "Unable to fetch Twilio account metadata. Delivery diagnostics may be incomplete.",
      fetchErr?.message ?? fetchErr
    );
  }

  return cachedAccountMeta;
}

function resolveSender(fromNumber) {
  if (messagingServiceSid) {
    return { messagingServiceSid };
  }

  if (!fromNumber) {
    console.error(
      "Twilio SMS aborted: missing TWILIO_FROM or TWILIO_MESSAGING_SERVICE_SID."
    );
    return null;
  }

  return { from: fromNumber };
}

// basic reusable sender
export async function sendSms(body, to = process.env.TO_NUMBER) {
  let missingEnv = false;
  REQUIRED_ENV.forEach((key) => {
    if (!process.env[key]) {
      console.error(
        `Twilio SMS aborted: environment variable ${key} is required.`
      );
      missingEnv = true;
    }
  });

  if (missingEnv) {
    return null;
  }

  const rawFrom = process.env.TWILIO_FROM;
  const fromNumber = messagingServiceSid
    ? rawFrom?.trim() ?? null
    : normalizeNumber("TWILIO_FROM", rawFrom);
  const toNumber = normalizeNumber("TO_NUMBER", to);

  const sender = resolveSender(fromNumber);

  if (!sender || !toNumber) {
    return null;
  }

  if (!messagingServiceSid && !fromNumber) {
    return null;
  }

  try {
    await ensureAccountMeta();

    const msg = await client.messages.create({
      ...sender,
      to: toNumber,
      body,
    });

    const finalStatus = await waitForFinalStatus(msg.sid);

    if (SUCCESS_STATUSES.has(finalStatus.status) && !finalStatus.errorCode) {
      console.log(
        `Twilio SMS delivered with status "${finalStatus.status}" (SID: ${msg.sid}).`
      );
      return finalStatus;
    } else {
      const hint = describeTwilioError(finalStatus.errorCode);
      console.error(
        `Twilio SMS delivery issue (status: ${finalStatus.status}, code: ${finalStatus.errorCode ?? "n/a"}): ${
          finalStatus.errorMessage ?? "Unknown Twilio error"
        }`
      );
      if (hint) {
        console.error(`Hint: ${hint}`);
      }
      return finalStatus;
    }
  } catch (err) {
    const code = err?.code;
    const hint = describeTwilioError(code);
    console.error("Twilio SMS failed:", err.message ?? err);
    if (hint) {
      console.error(`Hint: ${hint}`);
    }
    return null;
  }
}

// call this right after server starts
export async function notifyServerStart(port) {
  await sendSms(`Node backend started on port ${port}`);
}

// optional: hook to send SMS on shutdown
export function attachShutdownNotifications(server) {
  const shutdown = async (signal) => {
    console.log(`Shutting down due to: ${signal}`);
    await sendSms(`Caution!!! Node backend stopped (signal: ${signal})`);
    server.close(() => process.exit(0));
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}
