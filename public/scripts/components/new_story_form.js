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
    console.log('my post data', data);
    event.preventDefault();
    createStory(data)
      .then(function() {
        return listStories();
      })
      .then(function(stories) {
        window.allStories.clearStories;
        window.allStories.addStories(stories);
        views_manager.show('stories');
      })
      .catch(function(error) {
        console.error(error);
        views_manager.show('stories');
      })
  });

// temporary testing code
  // const $storyFormButton = $(`<button class="new_story_form_button">Create a Story</button>`);
  // $storyFormButton.appendTo('#main-content');
  // $storyFormButton.on('click', function() {
  //   views_manager.show('storyForm');
  // })

});
