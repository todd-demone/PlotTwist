$(() => {

  window.story = {};

  function createStory(story, isOriginalAuthor) {
    let $storyObj = $(`
    <div class="story" id="${story.id}">
      <div class="story__header">
        <div class="story__usericon"><i class="fa-regular fa-circle-user fa-xl"></i></div>
        <div class="story__username">Posted by ${story.username}</div>
        <div class="story__date">${moment(story.date_created).fromNow()}</div>
        ${ story.completed === true ? `<div class="story__completed">COMPLETED</div>` : (isOriginalAuthor ?  `<div class="story__complete_button">Mark Complete</div>` : `<div></div>`) }
      </div>
      <h2 class="story__title">${story.title}</h2>
      <p class="story__bodytext">${story.bodytext}</p>
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
