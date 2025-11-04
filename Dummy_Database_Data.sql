USE `tracker-t9`;

START TRANSACTION;

INSERT INTO users (id_user, role, fName, lName, email, createdAt, updatedAt) VALUES
  (1, 'admin',    'Alicia', 'Nguyen',  'admin@tracker.test',      '2024-04-01 08:00:00', '2024-04-01 08:00:00'),
  (2, 'coach',    'Brian',  'Lopez',   'brian.lopez@tracker.test','2024-04-01 08:05:00', '2024-04-01 08:05:00'),
  (3, 'coach',    'Carmen', 'Scott',   'carmen.scott@tracker.test','2024-04-01 08:10:00','2024-04-01 08:10:00'),
  (4, 'athletes', 'Diego',  'Cruz',    'diego.cruz@tracker.test', '2024-04-01 08:15:00', '2024-04-18 09:00:00'),
  (5, 'athletes', 'Eva',    'Patel',   'eva.patel@tracker.test',  '2024-04-01 08:20:00', '2024-04-03 07:45:00'),
  (6, 'athletes', 'Felix',  'Howard',  'felix.howard@tracker.test','2024-04-01 08:25:00','2024-04-20 10:30:00');

INSERT INTO teams (id_team, name, description, createdAt, updatedAt) VALUES
  (1, 'Varsity Lions', 'Senior athletes focusing on power and speed.', '2024-04-01 09:00:00', '2024-04-22 17:00:00'),
  (2, 'Junior Hawks', 'Development squad emphasizing fundamentals.',  '2024-04-01 09:05:00', '2024-04-23 16:00:00');

INSERT INTO muscle_groups (id_muscle_group, muscle, createdAt, updatedAt) VALUES
  (1, 'Chest',     '2024-04-01 09:10:00', '2024-04-01 09:10:00'),
  (2, 'Legs',      '2024-04-01 09:11:00', '2024-04-01 09:11:00'),
  (3, 'Back',      '2024-04-01 09:12:00', '2024-04-01 09:12:00'),
  (4, 'Core',      '2024-04-01 09:13:00', '2024-04-01 09:13:00'),
  (5, 'Full Body', '2024-04-01 09:14:00', '2024-04-01 09:14:00');

INSERT INTO lessons (id_lesson, id_user, id_muscle_group, title, description, isCompleted, published, createdAt, updatedAt) VALUES
  (1, 2, 1, 'Upper Body Fundamentals', 'Introductory pressing and push movements.', 0, 1, '2024-04-01 10:00:00', '2024-04-18 08:30:00'),
  (2, 2, 2, 'Lower Body Power',        'Strength work for squat pattern.',          0, 1, '2024-04-01 10:05:00', '2024-04-20 10:30:00'),
  (3, 3, 4, 'Core Stability Circuit', 'Core activation and stability focus.',       0, 1, '2024-04-01 10:10:00', '2024-04-23 16:00:00');

INSERT INTO exercises (id_exercise, id_lesson, name, description, reps, sets, isCompleted, createdAt, updatedAt) VALUES
  (1, 1, 'Barbell Bench Press', 'Work up to challenging set across 3 rounds.', 10, 3, 0, '2024-04-01 11:00:00', '2024-04-18 09:00:00'),
  (2, 1, 'Push-Up Ladder',      'Unbroken ladder 5-10-15-10-5 reps.',          45, 1, 0, '2024-04-01 11:05:00', '2024-04-18 09:05:00'),
  (3, 2, 'Back Squat',          'Controlled tempo squats focusing on depth.',   8, 4, 0, '2024-04-01 11:10:00', '2024-04-20 10:30:00'),
  (4, 2, 'Walking Lunges',      'Bodyweight lunges down and back 20 yards.',   20, 3, 0, '2024-04-01 11:15:00', '2024-04-20 10:35:00'),
  (5, 3, 'RKC Plank Hold',      'Three rounds of plank holds building tension.',1, 3, 0, '2024-04-01 11:20:00', '2024-04-23 16:00:00');

INSERT INTO user_teams (id_user, id_team, createdAt, updatedAt) VALUES
  (2, 1, '2024-04-01 12:00:00', '2024-04-01 12:00:00'),
  (4, 1, '2024-04-01 12:05:00', '2024-04-18 09:00:00'),
  (5, 1, '2024-04-01 12:10:00', '2024-04-03 07:45:00'),
  (3, 2, '2024-04-01 12:15:00', '2024-04-01 12:15:00'),
  (6, 2, '2024-04-01 12:20:00', '2024-04-20 10:30:00');

INSERT INTO catalogs (id_user, id_lesson, createdAt, updatedAt) VALUES
  (2, 1, '2024-04-01 12:30:00', '2024-04-01 12:30:00'),
  (4, 1, '2024-04-01 12:31:00', '2024-04-18 09:00:00'),
  (4, 2, '2024-04-01 12:32:00', '2024-04-20 10:30:00'),
  (5, 1, '2024-04-01 12:33:00', '2024-04-03 07:45:00'),
  (6, 3, '2024-04-01 12:34:00', '2024-04-23 16:00:00');

INSERT INTO sessions (id_session, id_user, token, expirationDate, createdAt, updatedAt) VALUES
  (1, 2, 'session-coach-brian-2024-01', '2024-07-01 12:00:00', '2024-04-02 08:00:00', '2024-04-02 08:00:00'),
  (2, 4, 'session-athlete-diego-2024-01', '2024-06-01 08:00:00', '2024-04-02 08:05:00', '2024-04-02 08:05:00'),
  (3, 5, 'session-athlete-eva-2024-01',   '2024-06-15 08:00:00', '2024-04-02 08:10:00', '2024-04-02 08:10:00');

INSERT INTO user_metrics (id_user_metric, id_user, recorded_at, weight_kg, height_cm, mile_time_min, bench_press_lb, squat_lb, deadlift_lb, notes, createdAt, updatedAt) VALUES
  (1, 4, '2024-03-15 08:30:00', 82.5, 180.00, 6.85, 185, 265, 305, 'Post off-season baseline.', '2024-03-15 08:30:00', '2024-03-15 08:30:00'),
  (2, 5, '2024-03-15 08:45:00', 65.2, 165.00, 7.40, 95, 155, 185, 'Maintaining during in-season.', '2024-03-15 08:45:00', '2024-03-15 08:45:00'),
  (3, 6, '2024-03-15 09:00:00', 90.3, 188.00, 6.20, 205, 295, 335, 'Recovered from ankle tweak.', '2024-03-15 09:00:00', '2024-03-15 09:00:00');

INSERT INTO player_goals (id_player_goal, id_user, id_exercise, title, description, playerTime, playerReps, createdAt, updatedAt) VALUES
  (1, 4, 1, 'Bench Press PR',    'Reach 3x10 at 185 lb with full control.', NULL, 10, '2024-04-01 13:00:00', '2024-04-18 09:00:00'),
  (2, 5, 5, 'Plank Endurance',   'Hold plank position for 2.5 minutes each set.', 2.5, NULL, '2024-04-01 13:05:00', '2024-04-03 07:45:00'),
  (3, 6, 3, 'Squat Volume',      'Complete 4x10 back squats at 275 lb.', NULL, 10, '2024-04-01 13:10:00', '2024-04-20 10:30:00');

INSERT INTO player_goal_progresses (id_player_goal_progress, id_player_goal, id_user_metric, recorded_at, actual_time, actual_reps, actual_weight, notes, createdAt, updatedAt) VALUES
  (1, 1, 1, '2024-04-01 09:00:00', NULL, 8, 175, 'Opened new cycle, felt heavy.',          '2024-04-01 09:00:00', '2024-04-01 09:00:00'),
  (2, 1, NULL, '2024-04-18 09:00:00', NULL, 10, 185, 'Goal achieved with spotter support.', '2024-04-18 09:00:00', '2024-04-18 09:00:00'),
  (3, 2, 2, '2024-04-03 07:45:00', 2.10, NULL, NULL, 'Added side planks after main sets.',  '2024-04-03 07:45:00', '2024-04-03 07:45:00'),
  (4, 3, 3, '2024-04-05 10:30:00', NULL, 9, 265, 'Improved depth, need more rest.',         '2024-04-05 10:30:00', '2024-04-05 10:30:00'),
  (5, 3, NULL, '2024-04-20 10:30:00', NULL, 10, 275, 'Volume goal met, ready to progress.',  '2024-04-20 10:30:00', '2024-04-20 10:30:00');

INSERT INTO team_goals (id_team_goal, id_team, id_exercise, title, description, avgTime, avgWeight, createdAt, updatedAt) VALUES
  (1, 1, 3, 'Team Squat Average',     'Raise team average squat weight to 275 lb.', NULL, 275, '2024-04-01 14:00:00', '2024-04-22 17:00:00'),
  (2, 2, 5, 'Core Endurance Standard','Average plank hold to 150 seconds across roster.', 2.5, NULL, '2024-04-01 14:05:00', '2024-04-23 16:00:00');

INSERT INTO team_goal_progresses (id_team_goal_progress, id_team_goal, recorded_at, avg_time, avg_weight, avg_reps, sample_size, notes, createdAt, updatedAt) VALUES
  (1, 1, '2024-04-01 17:00:00', NULL, 255, 9, 8, 'Post strength block testing.',    '2024-04-01 17:00:00', '2024-04-01 17:00:00'),
  (2, 1, '2024-04-22 17:00:00', NULL, 268, 10, 9, 'Closing gap to target.',          '2024-04-22 17:00:00', '2024-04-22 17:00:00'),
  (3, 2, '2024-04-05 16:00:00', 2.10, NULL, NULL, 6, 'Several new athletes joined.', '2024-04-05 16:00:00', '2024-04-05 16:00:00'),
  (4, 2, '2024-04-23 16:00:00', 2.40, NULL, NULL, 7, 'Almost at standard.',          '2024-04-23 16:00:00', '2024-04-23 16:00:00');

COMMIT;