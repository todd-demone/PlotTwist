$(() => {
  const $pageHeader = $('.page_header__container')
  $pageHeader.append(`
        <div class="box"><img src="media/workingLogo.png" alt="PlotTwist Logo" id="logo"></img></div>
        <div class="box"><button class="new_story_form_button">Create a Story</button></div>
        `)
        getUserObject()
        .then(result => {


          if (result) {
            $pageHeader.append(`<div class="box"><div class="user-object">Greetings <span>${result.username}!</span></div></div>`)
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
