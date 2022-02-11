$(() => {

  window.newTwistForm = {};

  function createNewTwistForm(story) {
    const $ntf = $(`
      <div class="new_twist">
        <form class="new_twist__form" action="/api/twists" method="post" >
          <input type="hidden" name="story_id" value="${story.id}" readonly>
          <input type="hidden" name="parent_id" value=0 readonly>
          <div class="new_twist__text_container">
            <textarea class="new_twist__bodytext" name="bodytext" cols="30" rows="10" placeholder="Write a new twist..."></textarea>
          </div>
          <button class="new_twist__submit_button" type="submit">Submit</button>
        </form>
      </div>
    `);

    $ntf.on('submit', '.new_twist__form', function(e) {
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

    return $ntf;
  };

  window.newTwistForm.createNewTwistForm = createNewTwistForm;

});
