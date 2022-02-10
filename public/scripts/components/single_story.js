$(() => {
  const nestedTwists = [];

///////////////////////
// Function Defns    //
///////////////////////

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

    // if story is marked 'completed', stop here - do not render newTwistForm or any unacceptedTwists
    if (data.story.completed) {
      return;
    }

    const newTwistFormEl = window.newTwistForm.createNewTwistForm(data.story);
    addElement(newTwistFormEl);

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

//////////////////////
// Global variables //
//////////////////////

  const $singleStory = $(`
  <section class="single_story">
  <p>Loading...</>
  </section>
  `);
  window.$singleStory = $singleStory;
  window.singleStory = {};
  window.singleStory.clearSingleStory = clearSingleStory;
  window.singleStory.addSingleStory = addSingleStory;

  ////////////////////
  // Event Handlers //
  ////////////////////
  
  // EVENT: SHOW TWIST FORM
  const showForm = function(e) {
    console.log(e.currentTarget);
  }
  $(".unaccepted_twist__show_form_button").on("click", showForm);

  // EVENT: SUBMIT TWIST
  const $newTwistForm = $('.new_twist_form');
  $newTwistForm.on("submit", function(event) {
    const data = $(this).serialize();
    event.preventDefault();
    createTwist(data)
      .then(function(response) {
        // hide newTwistForm
        // createUnacceptedTwist
        // append unacceptedTwist below parent?
      })
      .catch(function(error) {
        console.error(error);
        views_manager.show('');
      });
  });
    
  // EVENT: VOTE FOR TWIST
  $(".single_story").on("click", '.unaccepted_twist__vote_icon', function() {
    //
  });

  // EVENT: ACCEPT A TWIST
  $(".single_story").on('click', '.unaccepted_twist__accept_button', function() {
    //
  });

  // EVENT: MARK STORY COMPLETED
  $(".single_story").on("click", '.story__complete_button', function() {
    window.singleStory.clearSingleStory();
    getMyDetails()
      .then(function(user) {
        completeStory(user.user_id);
        return user;
      })
      .then(function(user) {
        return getStory(user.user_id);
      })
      .then(function(response) {
        window.singleStory.clearSingleStory();
        window.singleStory.addSingleStory(response);
        views_manager.show('singleStory');
      })
      .catch(function(error) {
        console.error(error);
        views_manager.show('singleStory');
      });
  });

});
