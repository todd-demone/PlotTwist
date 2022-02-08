$(() => {
  // This is here temporarily. It is used to test the singleStory.addSingleStory() function. 
  $("body").on("click", ".single_story_button", function() {
    getStory(2)
    .then(function(storyData) {
      window.singleStory.addSingleStory(storyData);
      views_manager.show('singleStory')
    })
  });
});
