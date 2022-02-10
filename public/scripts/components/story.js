$(() => {

  window.story = {};

  function createStory(story, isOriginalAuthor) {
    let $storyObj = $(`
    <div class="story" id="${story.id}" style="background-color: white; margin-bottom: 2.5rem;">
      <div class="story__header" style="display: flex;">
        <div class="story__usericon"><img src="https://i.imgur.com/73hZDYK.png" width="25" height="25"></div>
        <div class="story__username">Posted by ${story.username}</div>
        <div class="story__date">${moment(story.date_created).fromNow()}</div>
        ${ isOriginalAuthor ?  `<div class="story__complete_button">Complete</div>` : `<div></div>`}
      </div>
      <h2 class="story__title">${story.title}</h2>
      <p class="story__bodytext" style="margin: 1rem 0 0;">${story.bodytext}</p>
    </div>
    `);

    $storyObj.on('click', '.story__complete_button', function() {
      completeStory(story.id)
        .then(function(result) {
          return getStory(result.story.id);
        })
        .then(function(singleStoryData) {
          window.singleStory.addSingleStory(singleStoryData);
          views_manager.show('singleStory');
        })
        .catch(function(error) {
          console.error(error);
          views_manager.show('singleStory');
        });
    });


    $storyObj.on("click", function() {
      console.log("storyID:",story.id)
      getStory(story.id)
      .then(function(storyData) {
        console.log("storyData:",storyData)
        window.singleStory.addSingleStory(storyData);
        views_manager.show('singleStory')
      })
    });

    return $storyObj;
  };

  window.story.createStory = createStory;



});
