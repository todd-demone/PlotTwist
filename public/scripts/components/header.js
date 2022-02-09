$(() => {
  const $pageHeader = $('#page-header')
  $pageHeader.append(`
  <img src="public/media/workingLogo.png" alt="PlotTwist Logo">
  <!-- Button has been temporarily added for testing purposes -->
  <button class="single_story_button">Get SingleStory</button>
  <button id="create_story_button">Create Story</button>
  <div class="user-object">USEROBJECT</div>
  `)

  // This is here temporarily. It is used to test the singleStory.addSingleStory() function.
  $("body").on("click", ".single_story_button", function() {
    getStory(2)
    .then(function(storyData) {
      window.singleStory.addSingleStory(storyData);
      views_manager.show('singleStory')
    })
  });

});
