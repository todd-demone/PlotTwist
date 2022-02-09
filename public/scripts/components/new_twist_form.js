$(() => {

  window.newTwistForm = {};

  function createNewTwistForm(story) {
    return `
      <div class="new_twist">
        <form class="new_twist__form">
          <input type="hidden" name="story_id" value="${story.id}" readonly>
          <input type="hidden" name="parent_id" value=0 readonly>
          <textarea class="new_twist__textarea" name="bodytext" cols="30" rows="10" placeholder="Write a new twist..."></textarea>
          <button class="new_twist__submit_button" type="submit">Submit</button>
        </form>
      </div>
    `;
  };

  window.newTwistForm.createNewTwistForm = createNewTwistForm;
  
});