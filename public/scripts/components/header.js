$(() => {
  const $pageHeader = $('#page-header')
  $pageHeader.append(`
        <img src="media/workingLogo.png" alt="PlotTwist Logo" id="logo"></img>
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

        //CREATE STORY BUTTON
        $("body").on("click", ".new_story_form_button", function() {
          views_manager.show('storyForm');
        });
});
