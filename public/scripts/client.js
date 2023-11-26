/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  // Hide the error message until needed 
  $('main.container > .error-container').hide();

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetData) {
    // Create the HTML structure using `tweetData`

    /* VV formats the date to something human-readable!*/
    const timeAgo = moment(tweetData.created_at).fromNow();
    const $tweetText = $('<p>').text(tweetData.content.text);

    /* VVV HTML Code for formatting the tweets from the initial tweets json*/
    const $tweet = $(`<article class="tweet">
    <header>
      <img src="${tweetData.user.avatars}" alt="${tweetData.user.name}'s avatar"/>
      <h2>${tweetData.user.name}</h2>
      
      <span>${tweetData.user.handle}</span>
    </header>
    <p>${escape(tweetData.content.text)}</p>
    <footer>
      <time>${timeAgo}</time>
      <div class="icons">
      <i class="fa-solid fa-flag" id="footer-icon"></i>
      <i class="fa-solid fa-retweet" id="footer-icon"> </i>
      <i class="fa-solid fa-heart" id="footer-icon"> </i>
      </div>
    </footer>
  </article>`);

    return $tweet;
  };

  const renderTweets = function(tweets) {
    // Empty the container first!
    
    $('.main-container').empty();


    //Loop through the array of tweets!
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.main-container').append($tweet);
    }
  };
  
  /* Error handling code as well as submission handling */
  $('#new-tweet-submission').on("submit", function(event) {
    event.preventDefault();
    // Slide up the error text box if submit is pressed
    $("main.container > .error-container").slideUp();
    let textLength = $('#tweet-text').val().length;
    
    if (!$('#tweet-text').val()) {
      event.preventDefault();
      // If the field is empty when you hit submit... error message and "clear" the field again...
      $("main.container > .error-container").slideDown();
      $("h2.error-msg").text("You can't send a blank tweet!");
      $('#new-tweet-submission')[0].reset();
      return;
    };
    if (textLength > 140) {
      event.preventDefault();
      // If the text length is > 140 when you hit submit, erase the field
      $(".error-msg").text("You can't send a tweet containing over 140 characters!");
      $("main.container > .error-container").slideDown();
      $('#new-tweet-submission')[0].reset();
      return;
    }

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(event.target).serialize(),
      success: () => {
        loadTweets();
      },
    });
  });

  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets",
      success: (parameter) => {
        console.log("tweet successfully created!", renderTweets(parameter));
        $('#new-tweet-submission')[0].reset();
      },
    });
  };

  loadTweets();

});
