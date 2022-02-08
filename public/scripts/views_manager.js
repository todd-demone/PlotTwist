// public/scripts/views_manager.js

// Basically a single function that, when called, wipes the page clean and
// appends a component to index.html's #main-content element. Which component is rendered depends
// on the argument passed to the function.
$(() => {

  const $main = $('#main-content');

  // Declare a new property on the 'window' object called views_manager.
  // Initialize views manager with an empty object.
  window.views_manager = {};

  // input: (String) the name of an element (e.g., 'stories' or 'newStoryForm')
  window.views_manager.show = function(item) {
    // Wipe the document clean
    // Remove any rendered components from the document, one by one
    // starting with $latestStories
    $allStories.detach();
    $singleStory.detach();
    // $newStoryForm.detach();
    // detach other components here

    // Append a component to the #main-content element on the html page.
    // Which component gets appended depends on the parameter handed to this function
    switch (item) {
      case 'stories':
        $allStories.appendTo($main);
        break;
      case 'singleStory':
        $singleStory.appendTo($main);
        break;
      case  'storyForm':
        $newStoryForm.appendTo($main);
        break;
      case 'error': {

        //
        break;
      }
    }
  }

});
