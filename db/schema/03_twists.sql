DROP TABLE IF EXISTS twists CASCADE;

CREATE TABLE twists (
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  parent_id INTEGER,
  bodytext VARCHAR(400),
  accepted BOOLEAN DEFAULT false,
  date_created TIMESTAMP DEFAULT current_timestamp
);
