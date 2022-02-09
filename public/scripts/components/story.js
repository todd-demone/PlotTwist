$(() => {

  window.story = {};

  function createStory(story, isOriginalAuthor) {
    console.log("inside createStory function")
    return `
<<<<<<< HEAD
    <div class="story" style="background-color: white; margin-bottom: 0;">
=======
    <div class="story" style="background-color: white; margin-bottom: 2.5rem;">  
>>>>>>> 63f3fbf5b6825ba800a4304b26018e12b39627db
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

});
