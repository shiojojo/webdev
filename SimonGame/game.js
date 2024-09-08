buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown( function(event){
    if (!started) {
        nextSequence();
        started = true;
    };
});

$('.btn').on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
};

function checkAnswer(currentLevel) {
    // console.log(currentLevel);
    // console.log(gamePattern[currentLevel]);
    // console.log(userClickedPattern[currentLevel]);
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence();  
            }, 1000);
        };
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass('game-over');
        setTimeout(() => {
            $("body").removeClass('game-over');
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver()
    };
};

function nextSequence() {
    userClickedPattern = [];
    level++
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
};

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColour){
    $("#" + currentColour).addClass('pressed');
    setTimeout(() => {
        $("#" + currentColour).removeClass('pressed');  
    }, 100);
}






// $(document).on("click", function(e) {
//     console.log(e);
//     nextSequence();
// });

