// /public/scripts/index.js

$(() => {
  // Make ajax call to retrieve all stories
  listStories().then(function( json ) {
    // Then generate the html for the stories
    allStories.addStories(json.stories);
    // Append the stories to the #main-content element on the html page
    views_manager.show('stories');
  });
});