$(() => {

  window.twist = {};

  function createAcceptedTwist(twist) {
    return `
      <div class="twist accepted_twist" style="background-color: white; margin-bottom: 2.5rem;">
        <div class="twist__header accepted_twist__header" style="display: flex;">
          <div class="twist__usericon accepted_twist__usericon"><i class="fa-regular fa-circle-user fa-xl"></i></div>
          <div class="twist__username accepted_twist__username">Posted by ${twist.username}</div>
          <div class="accepted_twist__date">${moment(twist.date_created).fromNow()}</div>
        </div>
        <p class="accepted_twist__bodytext">${twist.bodytext}</p>
      </div>
    `;
  };

  function createUnacceptedTwist(twist, isOriginalAuthor, topLevel) {
    const $ut = $(`
    <div class="twist unaccepted_twist" style="margin-bottom: 2.5rem; margin-left: calc(${twist.depth} * 20px); background-color: white;">
      <div class="twist__header unaccepted_twist__header" style="display: flex;">
        <div class="twist__usericon unaccepted_twist__usericon"><i class="fa-regular fa-circle-user fa-xl"></i></div>
        <div class="twist__username unaccepted_twist__username">Posted by ${twist.username}</div>
        <div class="unaccepted_twist__date">${moment(twist.date_created).fromNow()}</div>
      </div>
      <p class="unaccepted_twist__bodytext">${twist.bodytext}</p>
      <div class="unaccepted_twist__footer" style="display: flex;">
        <div class="votes">
          <div class="unaccepted_twist__vote_icon"><i class="fa-regular fa-circle-up fa-xl"></i></div>
          <div class="unaccepted_twist__vote_count">${twist.number_of_votes}</div>
        </div>
        <button class="unaccepted_twist__show_form_button">Twist It!</button>
        ${ isOriginalAuthor && topLevel === twist.depth ?  `<div class="unaccepted_twist__accept_button">Accept</div>` : `<div></div>`}
      </div>
      <form class="unaccepted_twist__form" style="display: none; margin-left: calc(${twist.depth} * 20px);">
        <input type="hidden" name="story_id" value="${twist.story_id}" readonly>
        <input type="hidden" name="parent_id" value="${twist.id}" readonly>
        <textarea class="unaccepted_twist__textarea" name="bodytext" cols="30" rows="10" placeholder="Write a new twist..."></textarea>
        <button class="unaccepted_twist__form__submit_button" type="submit">Submit</button>
      </form>
    </div>
    `);

    $ut.on('click', '.unaccepted_twist__show_form_button', function() {
      $(this).parent().next().show();
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

    return $ut;
  }

  window.twist.createAcceptedTwist = createAcceptedTwist;
  window.twist.createUnacceptedTwist = createUnacceptedTwist;

});
