// public/scripts/network.js

// a collection of functions, each of which makes an ajax call and
// returns data as required.

const listStories = function() {
  return $.ajax({
    url: "/api/stories",
  });
};

const getStory = function(story_id) {
  return $.ajax({
    url: `/api/stories/${story_id}`,
  });
};

const createStory = function(data) {
  return $.ajax({
    method: "POST",
    url: "/api/stories",
    data,
  });
};

const completeStory = function(story_id) {
  return $.ajax({
    method: "PUT",
    url: `/api/stories/${story_id}/complete`,
  });
};

const deleteStory = function(story_id) {
  return $.ajax({
    method: "PUT",
    url: `/api/stories/${story_id}/delete`,
  });
}

const updateStory = function(story_id, data) {
  return $.ajax({
    method: "PUT",
    url: `/api/stories/${story_id}/edit`,
    data,
  });
}