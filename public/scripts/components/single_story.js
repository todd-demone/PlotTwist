$(() => {
  const nestedTwists = [];
  
  const $singleStory = $(`
  <section class="single_story">
  <p>Loading...</>
  </section>
  `);
      
  window.$singleStory = $singleStory;
  
  window.singleStory = {};
  
  function clearSingleStory() {
    $singleStory.empty();
  };
  
  function addElement(element) {
    $singleStory.append(element);
  };
  
  function addSingleStory(data) {
    let lastAcceptedId = 0;
    
    clearSingleStory();
    
    const storyEl = story.createStory(data.story);
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

    for (const twist of nestedTwists) {
      const twistEl = window.twist.createUnacceptedTwist(twist);
      addElement(twistEl);
    }
  };

  window.singleStory.addSingleStory = addSingleStory;

});