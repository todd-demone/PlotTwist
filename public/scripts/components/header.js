$(() => {
  const $pageHeader = $('#page-header')
  $pageHeader.append(`
        <img src="media/workingLogo.png" alt="PlotTwist Logo" id="logo"></img>
        <!-- Button has been temporarily added for testing purposes -->
        <button class="single_story_button">Get SingleStory</button>
        <button class="new_story_form_button">Create a Story</button>
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
        // SINGLE STORY BUTTON (This is here temporarily. It is used to test the singleStory.addSingleStory() function.)
        // $("body").on("click", ".single_story_button", function() {
        //   getStory(2)
        //   .then(function(storyData) {
        //     window.singleStory.addSingleStory(storyData);
        //     views_manager.show('singleStory')
        //   })
        // });

        //CREATE STORY BUTTON
        $("body").on("click", ".new_story_form_button", function() {
          views_manager.show('storyForm');
        });
});
