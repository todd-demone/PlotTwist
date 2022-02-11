$(() => {

  const $newStoryForm = $(`
    <form class="new_story__form" action="/api/stories" method="post" >
      <input class="new_story__title" type="text" name="title" placeholder="Title">
      <textarea class="new_story__bodytext" name="bodytext" placeholder="Text" cols="30" rows="10"></textarea>
      <button class="new_story__submit_button type="submit">Create</button>
    </form>
  `);

  window.$newStoryForm = $newStoryForm;

  $newStoryForm.on('submit', function (event) {
    const data = $newStoryForm.serialize();
    event.preventDefault();
    createStory(data)
    .then(function() {
      return listStories();
    })
    .then(function(stories) {
      window.allStories.clearStories;
      window.allStories.addStories(stories);
      views_manager.show('stories');
      $newStoryForm.trigger('reset');
    })
      .catch(function(error) {
        console.error(error);
        views_manager.show('stories');
      })
  });

});
