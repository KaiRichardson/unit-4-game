// stats
var heroHP = 0;
var oppHP = 0;
var heroAtt = 0;
var oppAtt = 0;
var oppNum = 3;

//deffender name
var oppName = "";
var btn;

// Click events
var idClicked = "";
var playerEmpt = true;
var oppEmpt = true;
var gameEnd = false;
// var bodyClone = $("#body").clone(); 

// When the game starts, the player will choose a character by clicking on the fighter's picture. 
$(".char").click(function (e) {
    idClicked = e.target.id;
    if (playerEmpt) {

        if (idClicked === "obi") {
            $("#obiSpan").appendTo($("#second"));
        }

        if (idClicked === "luke") {
            $("#lukeSpan").appendTo($("#second"));
        }

        if (idClicked === "vader") {
            $("#vaderSpan").appendTo($("#second"));
        }

        if (idClicked === "maul") {
            $("#maulSpan").appendTo($("#second"));
        }
        $("#first>.char").css({ "border": "2px solid black", "background-color": "rgb(170, 36, 36)" });
        $("#instruct").text("Choose your Opponent");

        playerEmpt = false;
        heroHP = parseInt($("#second>.char>.charHP").text());
        heroAtt = parseInt($("#second>span").attr("attp"));
        // console.log(heroHP);
        // console.log(heroAtt);


    } else if (oppEmpt) {

        if (idClicked === "obi") {
            $("#obiSpan").appendTo($("#third"));
        }

        if (idClicked === "luke") {
            $("#lukeSpan").appendTo($("#third"));
        }

        if (idClicked === "vader") {
            $("#vaderSpan").appendTo($("#third"));
        }

        if (idClicked === "maul") {
            $("#maulSpan").appendTo($("#third"));
        }
        $("#third>.char").css({ "border": "2px solid green", "background-color": "black", "color": "rgb(173, 173, 173)" });
        $("#instruct").text("Get Ready to Fight!");

        oppEmpt = false;
        oppHP = parseInt($("#third>.char>.charHP").text());
        oppAtt = parseInt($("#third>span").attr("cap"));
        oppName = $("#third>.char>.name").text();
        // console.log(oppHP);
        // console.log(oppAtt);
    }
});


// The player will now be able to click the `attack` button.
$("#fight_btn").click(function () {

    if (!playerEmpt && !oppEmpt && !gameEnd) {
        $("#instruct").text("Ouch!");
        // Whenever the player clicks `attack`, their character damages the defender. The opponent will lose `HP` (health points). These points are displayed at the bottom of the defender's picture. 
        // The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their `HP`. These points are shown at the bottom of the player character's picture.

        $("#attack").html("<h3>You attacked " + oppName + " for " + heroAtt + " damage!</h3>");
        $("#defend").html("<h3>" + oppName + " attacked you back for " + oppAtt + " damage!</h3>");

        heroHP = heroHP - oppAtt;
        oppHP = oppHP - heroAtt;

        $("#second .charHP").text(heroHP);
        $("#third .charHP").text(oppHP);

        heroAtt = heroAtt + parseInt($("#second>span").attr("attp"));
        // console.log(heroHP);
        // console.log(oppHP);
        // console.log(heroAtt);
        if (oppHP <= 0) {
            $("#instruct").text("Nice job! Pick another opponant!");
            $("#third>.char").remove();
            $("#defend").empty();
            oppEmpt = true;

            oppHP = parseInt($("#third>.char>.charHP").text());
            oppAtt = parseInt($("#third>span").attr("cap"));
            oppName = $("#third>.char>.name").text();
            oppNum--;

            if (oppNum === 0) {
                $("#instruct").text("You won! Great job!");
                gameEnd = true;
                $("#new_game_btn").removeAttr('style');
            }
            
        } else if (heroHP <= 0) {
            $("#instruct").text("Oh no! you lost!");
            gameEnd = true;
            $("#new_game_btn").removeAttr('style');
        }
    }

});
// restart button
$("#new_game_btn").click(function () {
    window.location.href=window.location.href;
    heroHP = 0;
    oppHP = 0;
    heroAtt = 0;
    oppAtt = 0;
    oppNum = 3;

    //deffender name
    oppName = "";

    // Click events
    idClicked = "";
    playerEmpt = true;
    oppEmpt = true;
    gameEnd = false;

});
