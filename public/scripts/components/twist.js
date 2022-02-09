$(() => {

  window.twist = {};

  function createAcceptedTwist(twist) {
    return `<p class="accepted_twist__bodytext" style="background-color: white; margin: 0; padding-top: 1rem;">${twist.bodytext}</p>`;
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
        <div class="new_twist_button">Twist It!</div>
        ${ isOriginalAuthor && topLevel === twist.depth ?  `<div class="unaccepted_twist__accept_button">Accept</div>` : `<div></div>`}
      </div>
    </div>
    `;
  };

  window.twist.createAcceptedTwist = createAcceptedTwist;
  window.twist.createUnacceptedTwist = createUnacceptedTwist;

});