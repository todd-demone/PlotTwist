$(() => {
  const nestedTwists = [];

  const $singleStory = $(`
  <section class="single_story">
  <p>Loading...</>
  </section>
  `);

  window.$singleStory = $singleStory;

  window.singleStory = {};

  //CLEAR HELPER
  function clearSingleStory() {
    $singleStory.empty();
  };

  //ADD TO JQUERY HELPER
  function addElement(element) {
    $singleStory.append(element);
  };

  //MAIN FUNCTION DEF
  function addSingleStory(data) {
    let lastAcceptedId = 0;
    const userId = Number(data.user_id); /// CHECK USER IS ALLOWED FOR ACCEPT BUTTONS
    const storyAuthorId = data.story.author_id;
    const isOriginalAuthor = userId === storyAuthorId;

    clearSingleStory();

    const storyEl = story.createStory(data.story, isOriginalAuthor);
    addElement(storyEl);

    for (const twist of data.twists) {
      if (twist.accepted) {
        lastAcceptedId = twist.id;
        const twistEl = window.twist.createAcceptedTwist(twist);
        addElement(twistEl);
      }
    }

    addElement(`<hr style="margin: 2.5rem 0;">`);

    function getNestedTwists(myParent_id) {
      const twists = data.twists.filter(twist => twist.accepted === false);

      for (const twist of twists) {
        if (!twist.accepted && twist.parent_id === myParent_id) {
          nestedTwists.push(twist);
          getNestedTwists(twist.id);
        }
      }
    };

    getNestedTwists(lastAcceptedId);

    const topLevel = nestedTwists[0].depth;
    for (const twist of nestedTwists) {
      const twistEl = window.twist.createUnacceptedTwist(twist, isOriginalAuthor, topLevel);
      addElement(twistEl);
    }
  };

  window.singleStory.addSingleStory = addSingleStory;

});
