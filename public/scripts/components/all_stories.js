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
    console.log("storyCard:", storyCard)
    $allStories.append(storyCard);
  }

  function addStories(stories) {
    clearStories();
    for (const story of stories) {
      // const storyCard = storyCard.createStoryCard(story);
      const storyCard = story.bodytext;
      addStoryCard(storyCard);
    }
  }

  window.allStories.addStories = addStories;

});
