$(() => {
  const $pageHeader = $('#page-header')
  $pageHeader.append(`
        <img src="media/workingLogo.png" alt="PlotTwist Logo" id="logo"></img>
        <!-- Button has been temporarily added for testing purposes -->
        <button class="single_story_button">Get SingleStory</button>
        <button id="create_story_button">Create Story</button>
        `)
        getUserObject()
        .then(result => {


          if (result) {
            console.log("result!",result)
            $pageHeader.append(`<div class="user-object">Greetings ${result.username}!</div>`)
          }

          $("body").on('click', "#logo", function() {
            views_manager.show('stories');
          })

        });
        // This is here temporarily. It is used to test the singleStory.addSingleStory() function.
        $("body").on("click", ".single_story_button", function() {
          getStory(2)
          .then(function(storyData) {
            window.singleStory.addSingleStory(storyData);
            views_manager.show('singleStory')
          })
        });

});
