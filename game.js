var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level = 0;
var started = false;
$(document).keydown(function(){
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length)-1);
    // $("#"+ userChosenColour).play("sounds/"+ userChosenColour + ".mp3");
});

function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
//4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length)
        {
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } 
      else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press any key to restart");
        startOver();
      }
}

function nextSequence()
{
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    level = level + 1;
}

function playSound(name)
{
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentColour)        // For animation for
{
        $("#" + currentColour).addClass("pressed");
        setTimeout(function(){
            $("#" + currentColour).removeClass("pressed");
        },100);
}

function startOver()
{
    level = 0;
    started = false;
    gamePattern = [];
}

// function game(userClickedPattern)
// {
    
//     if(userClickedPattern === gamePattern)
//         nextSequence();
//     else
//         {
//             $("#level-title").text("Game Over, Press any key to restart");
//             started = false;
//         }
    
//     userClickedPattern = [];
// }



