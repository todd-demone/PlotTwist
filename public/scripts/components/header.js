$(() => {
  const $pageHeader = $('#page-header')
  $pageHeader.append(`
        <img src="media/workingLogo.png" alt="PlotTwist Logo" id="logo"></img>
        <button class="new_story_form_button">Create a Story</button>
        `)
        getUserObject()
        .then(result => {

          if (result) {
            $pageHeader.append(`
              <div class="logout_button">
                <h2>Greetings ${result.username}!</h2>
                <button type="submit" class="logout_button">Logout</button
              </div>`)

          } else {
            $pageHeader.append(`
              <div class="user-object">
                <button class="login_button" type="submit">Login</button>
              </div>`)
          }


          $("body").on('click', '.logout_button', function() {
            console.log("logging out")
            logout()
              .then(() => {
                views_manager.show('stories');
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
