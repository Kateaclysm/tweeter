/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const createTweetElement = function(tweetData) {
  // Create the HTML structure using `tweetData`

  /* VV formats the date to something human-readable!*/
  const timeAgo = moment(tweetData.created_at).fromNow();

  const $tweet = $(`<article class="tweet">
    <header>
      <img src="${tweetData.user.avatars}" alt="${tweetData.user.name}'s avatar"/>
      <h2>${tweetData.user.name}</h2>
      <span>${tweetData.user.handle}</span>
    </header>
    <p>${tweetData.content.text}</p>
    <footer>
      <time>${timeAgo}</time>
    </footer>
  </article>`);

  return $tweet;
};
$(document).ready(function(){

  const tweetData =  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  
  }

  const $tweet = createTweetElement(tweetData);
  console.log($tweet);

$('#tweets-container').append($tweet);
})


const renderTweets = function(tweets) {
  // Empty the container first!
  $('#tweets-container').empty();

  //Loop through the array of tweets!
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};



$(document).ready(function(){
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  renderTweets(data);

  $('#new-tweet-submission').on("submit", function(event) {
    event.preventDefault();
    console.log("inside submit event handler", event.target);
    console.log("serialized form values:", $(event.target).serialize());
    $.ajax({
    url: "/tweets", 
    data: $(event.target).serialize(), 
    success: ()=> {
      console.log("tweet successfully created!");
    },
    method: "POST"
});
  
});

});
