$(() => {
  const $pageHeader = $('.header__container')
  $pageHeader.append(`
        <div class="box"><img src="media/workingLogo.png" alt="PlotTwist Logo" id="logo"></img></div>
        <div class="box middle_box" id="middle-header-box">
          <button class="new_story_form_button">Create a Story</button>
        </div>
        <div class="box user_object"></div>
        `)
        getUserObject()
        .then(result => {

          if (result) {
            $('.user_object').html(`
            <div id="user_object__box">
              <div class="user_object__usericon">
                <i class="fa-regular fa-circle-user fa-5x"></i>
              </div>
              <h2 id="username">${result.username}</h2>
              <button type="submit" class="logout_button">Logout</button>
            </div>
            `)

          } else {
            $('.user_object').html(`
              <div class="login_button">
                <button class="login_button" type="submit">Login</button>
              </div>`)
          }


          $("body").on('click', '.logout_button', function() {
            console.log("logging out")
            logout()
              .then(() => {
                $('.user_object').empty().html(`
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
