$(() => {

  window.twist = {};

  function createAcceptedTwist(twist) {
    return `
      <div class="twist accepted_twist depth--${twist.depth}" style="margin-bottom: 0;">
        <div class="twist__header accepted_twist__header">
          <div class="twist__usericon accepted_twist__usericon"><i class="fa-regular fa-circle-user fa-xl"></i></div>
          <div class="twist__username accepted_twist__username">Posted by ${twist.username}</div>
          <div class="accepted_twist__date">${moment(twist.date_created).fromNow()}</div>
        </div>
        <p class="accepted_twist__bodytext">${twist.bodytext}</p>
      </div>
    `;
  };

  function createUnacceptedTwist(twist, isOriginalAuthor, topLevel, userId) {

        const $ut = $(`
          <div class=" twist unaccepted_twist depth--${twist.depth}" style="margin-left: calc(${twist.depth} * 50px);">
            <div class=" twist__header unaccepted_twist__header">
              <div class="twist__usericon unaccepted_twist__usericon"><i class="fa-regular fa-circle-user fa-xl"></i></div>
              <div class="twist__username unaccepted_twist__username">Posted by ${twist.username}</div>
              <div class="unaccepted_twist__date">${moment(twist.date_created).fromNow()}</div>
            </div>
            <p class="unaccepted_twist__bodytext">${twist.bodytext}</p>
            <div class="unaccepted_twist__footer">

                <div class="unaccepted_twist__vote_icon"><i class="fa-solid fa-circle-up fa-xl"></i></div>
                <div class="unaccepted_twist__vote_count">${twist.number_of_votes}</div>

              ${ userId ? `<div class="unaccepted_twist__show_form_button">Twist It!</div>` : `<div></div>` }
              ${ isOriginalAuthor && topLevel === twist.depth ?  `<div class="unaccepted_twist__accept_button">Accept</div>` : `<div></div>`}
            </div>
            <form class="unaccepted_twist__form" style="margin-left: calc(${twist.depth} * 50px);">
              <input type="hidden" name="story_id" value="${twist.story_id}" readonly>
              <input type="hidden" name="parent_id" value="${twist.id}" readonly>
              <textarea class="unaccepted_twist__textarea" name="bodytext" cols="30" rows="10" placeholder="Write a new twist..."></textarea>
              <div id="twist_on_twist_button_container">
                <button class="unaccepted_twist__form__submit_button" type="submit">Submit</button>
              </div>
            </form>
          </div>
          `);

          $ut.on('click', '.unaccepted_twist__show_form_button', function() {
            $(this).parent().next().slideToggle(
            //   function() {
            //   if ($(this).is(':visible'))
            //       $(this).css('display','flex');
            // }
            );
          });

          $ut.on('submit', '.unaccepted_twist__form', function(e){
            e.preventDefault();
            const data = $(this).serialize();
            createTwist(data)
              .then(function(result) {
                return getStory(result.twist.story_id);
              })
              .then(function(singleStoryData) {
                window.singleStory.addSingleStory(singleStoryData);
                views_manager.show('singleStory');
              })
              .catch(function(error) {
                console.error(error);
                views_manager.show('stories');
              });
          });

          $ut.on('click', '.unaccepted_twist__accept_button', function() {
            acceptTwist(twist.id)
              .then(function(result) {
                return getStory(result.twist.story_id);
              })
              .then(function(singleStoryData) {
                window.singleStory.addSingleStory(singleStoryData);
                views_manager.show('singleStory');
              })
              .catch(function(error) {
                console.error(error);
                views_manager.show('singleStory');
              });
          });

          $ut.on('click', '.unaccepted_twist__vote_icon', function() {
            getUserObject()
              .then(result => {
                if (result) {
                  createVote(twist.id)
                    // //GET VOTE NUMBER FROM DATABASE
                    // .then(function() {
                    //   const numVotes = getTwistVotes(twist.id)
                    //   $(this).next('.unaccepted_twist__vote_count').text(numVotes);
                    // })
                  // CHEAT: ADD 1 TO VOTE NUMBER
                  const count = $(this).next('.unaccepted_twist__vote_count').text();
                  $(this).next('.unaccepted_twist__vote_count').text(Number(count) + 1);

                }
              })
          });

      return $ut;
    }

  window.twist.createAcceptedTwist = createAcceptedTwist;
  window.twist.createUnacceptedTwist = createUnacceptedTwist;

});
