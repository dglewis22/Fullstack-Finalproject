CREATE DATABASE IF NOT EXISTS project_database;
USE project_database;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS topics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  topic_id INT,
  FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
);

INSERT INTO topics (name) VALUES 
('Math'),
('Science'),
('History');

INSERT INTO questions (question, answer, topic_id) VALUES 
('What is 2 + 2?', '4', 1),
('What is 5 * 6?', '30', 1);

-- Insert sample questions for the 'Science' topic
INSERT INTO questions (question, answer, topic_id) VALUES 
('What is the chemical symbol for water?', 'H2O', 2),
('What planet is known as the Red Planet?', 'Mars', 2);

INSERT INTO questions (question, answer, topic_id) VALUES 
('Who was the first president of the United States?', 'George Washington', 3),
('In what year did World War II end?', '1945', 3);


SELECT * FROM topics;

SELECT * FROM questions WHERE topic_id = 1; -- For Math questions
SELECT * FROM questions WHERE topic_id = 2; -- For Science questions
SELECT * FROM questions WHERE topic_id = 3; -- For History questions

INSERT INTO questions (question, answer, topic_id) VALUES
-- Math Questions
('What is 10 + 5?', '15', 1),
('What is 12 * 12?', '144', 1),
('What is 50 - 25?', '25', 1),
('What is 9 ÷ 3?', '3', 1),
('What is the square root of 64?', '8', 1),

-- Science Questions
('What is the chemical symbol for oxygen?', 'O', 2),
('What planet is known as the Red Planet?', 'Mars', 2),
('What is the main gas found in the Earth’s atmosphere?', 'Nitrogen', 2),
('What is the hardest natural substance on Earth?', 'Diamond', 2),
('What is the process by which plants make their own food?', 'Photosynthesis', 2),

-- History Questions
('Who was the first president of the United States?', 'George Washington', 3),
('In what year did World War II end?', '1945', 3),
('Who was the first emperor of China?', 'Qin Shi Huang', 3),
('What year did the Titanic sink?', '1912', 3),
('Who was the leader of the Soviet Union during World War II?', 'Joseph Stalin', 3);



