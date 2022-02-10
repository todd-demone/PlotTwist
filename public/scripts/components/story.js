$(() => {

  window.story = {};
  let story_id;

  function createStory(story, isOriginalAuthor) {
    console.log("inside createStory function")
    story_id = story.id
    return `
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
    `;
  };

  window.story.createStory = createStory;

  $("body").on("click", ".story", function() {
    getStory(story_id)
    .then(function(storyData) {
      window.singleStory.addSingleStory(storyData);
      views_manager.show('singleStory')
    })
  });

});
