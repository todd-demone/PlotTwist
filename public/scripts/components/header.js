$(() => {
  const $pageHeader = $('.header__container')
  $pageHeader.append(`
        <div class="box"><img src="media/workingLogo.png" alt="PlotTwist Logo" id="logo"></img></div>
        <div class="box middle_box" id="#middle-header-box">
          <button class="new_story_form_button">Create a Story</button>
        </div>
        <div class="box userObject"></div>
        `)
        getUserObject()
        .then(result => {

          if (result) {
            $('.userObject').html(`
            <div class="logout_button_box">
              <h2>Greetings ${result.username}!</h2>
              <button type="submit" class="logout_button">Logout</button
            </div>`)

          } else {
            $('.userObject').html(`
              <div class="login_button">
                <button class="login_button" type="submit">Login</button>
              </div>`)
          }


          $("body").on('click', '.logout_button', function() {
            console.log("logging out")
            logout()
              .then(() => {
                $('.userObject').empty().html(`
              <div class="login_button">
                <button class="login_button" type="submit">Login</button>
              </div>`)
              })
              .catch(error => {
                console.error(error.message);
                views_manager.show('stories');
              });
          })
        });

        $("body").on('click', "#logo", function() {
          views_manager.show('stories');
        })

        //CREATE STORY BUTTON
        $("body").on("click", ".new_story_form_button", function() {
          views_manager.show('storyForm');
        });
});
