$(document).ready(function() {
  $('#tweet-text').on("keyup", function() {
    let tweet = $(this).val();
    console.log("keypress event logged.");
    let counterElement = $('#tweet-text').siblings("div").children(".counter");
    counterElement.text(140 - tweet.length);
    console.log(counterElement);
    if (tweet.length >= 140) {
      $("output").css({ color: "red" });
      // This slides down the error text if they go over 140 characters.
      $(".error-msg").text("You can't send a tweet containing over 140 characters!");
      $("main.container > .error-container").slideDown();
      return;
    } else {
      // Otherwise, if they are under the character limit, slide it up.
      $("output").css({ color: "black" });
      $("main.container > .error-container").slideUp();
    }
  });
});
