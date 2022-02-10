$(() => {

  const $allStories = $(`
  <section class="stories">
    <p>Loading...</>
  </section>
  `);

  window.$allStories = $allStories;

  window.allStories = {};

  function clearStories() {
    $allStories.empty();
  }

  window.allStories.clearStories = clearStories;

  function addStoryCard(storyCard) {
    $allStories.append(storyCard);
  }

  function addStories(stories) {
    clearStories();
    for (const data of stories) {
      const storyCard = story.createStory(data, false);
      addStoryCard(storyCard);
    }
  }

  window.allStories.addStories = addStories;

});
