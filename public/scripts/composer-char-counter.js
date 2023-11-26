$(document).ready(function() {
  $('#tweet-text').on("keyup", function() {
    let tweet = $(this).val();
    console.log("keypress event logged.");
    let counterElement = $('#tweet-text').siblings("div").children(".counter");
    counterElement.text(140 - tweet.length);
  });
});
