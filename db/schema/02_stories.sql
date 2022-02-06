DROP TABLE IF EXISTS stories CASCADE;

CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  bodytext TEXT,
  date_created TIMESTAMP DEFAULT current_timestamp,
  completed BOOLEAN NOT NULL DEFAULT false
);
