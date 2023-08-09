var buttonColours=["red", "blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var level=0;
var started=false;

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (gamePattern.length=== userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
        soundPlay("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);

        startOver();
    }
   
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio= new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

$(document).keypress(function(){
       if(!started){
        $("#level-title").text("Level " + level);
       nextSequence();
       started=true;}

});

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    soundPlay(userChosenColour);
    animatepress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});

function soundPlay(sound){
    var audio= new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

function animatepress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

 function startOver(){
    level=0;
    gamePattern=[];
    started=false;
 }