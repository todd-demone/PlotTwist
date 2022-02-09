$(() => {

  window.twist = {};

  function createAcceptedTwist(twist) {
    return `
      <div class="accepted_twist" style="background-color: white; margin-bottom: 2.5rem;">
        <div class="accepted_twist__header" style="display: flex;">
          <div class="accepted_twist__usericon"><img src="https://i.imgur.com/73hZDYK.png" width="25" height="25"></div>
          <div class="accepted_twist__username">Posted by ${twist.username}</div>
          <div class="accepted_twist__date">${moment(twist.date_created).fromNow()}</div>
        </div>
        <p class="accepted_twist__bodytext">${twist.bodytext}</p>
      </div>
    `;
  };

  function createUnacceptedTwist(twist, isOriginalAuthor, topLevel) {
    return `
    <div class="unaccepted_twist" style="margin-bottom: 2.5rem; margin-left: calc(${twist.depth} * 20px); background-color: white;">
      <div class="unaccepted_twist__header" style="display: flex;">
        <div class="unaccepted_twist__usericon"><img src="https://i.imgur.com/73hZDYK.png" width="25" height="25"></div>
        <div class="unaccepted_twist__username">Posted by ${twist.username}</div>
        <div class="unaccepted_twist__date">${moment(twist.date_created).fromNow()}</div>
      </div>
      <p class="unaccepted_twist__bodytext">${twist.bodytext}</p>
      <div class="unaccepted_twist__footer" style="display: flex;">
        <div class="unaccepted_twist__vote_icon">⬆️</div>
        <div class="unaccepted_twist__vote_count">${twist.number_of_votes}</div>
        <div class="unaccepted_twist__show_form_button">Twist It!</div>
        ${ isOriginalAuthor && topLevel === twist.depth ?  `<div class="unaccepted_twist__accept_button">Accept</div>` : `<div></div>`}
      </div>
    </div>
    <div class="new_twist" style="display: none; margin-left: calc(${twist.depth} * 20px);">
      <form class="new_twist__form">
        <input type="hidden" name="story_id" value="${twist.story_id}" readonly>
        <input type="hidden" name="parent_id" value=${twist.parent_id}" readonly>
        <textarea class="new_twist__textarea" name="bodytext" cols="30" rows="10" placeholder="Write a new twist..."></textarea>
        <button class="new_twist__submit_button" type="submit">Submit</button>
      </form>
    </div>
    `;
  };

  window.twist.createAcceptedTwist = createAcceptedTwist;
  window.twist.createUnacceptedTwist = createUnacceptedTwist;

});