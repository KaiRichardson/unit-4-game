// stats
var heroHP = 0;
var oppHP = 0;
var heroAtt = 0;
var oppAtt = 0;
var oppNum = 3;

//deffender name
var oppName = "";

// Click events
var idClicked = "";
var playerEmpt = true;
var oppEmpt = true;
var gameEnd = false;

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
        playerEmpt = false;
        $("#first>.char").css({ "border": "2px solid black", "background-color": "rgb(170, 36, 36)" });
        $("#instruct").text("Choose your Opponent");
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
        oppEmpt = false;
        $("#third>.char").css({ "border": "2px solid green", "background-color": "black", "color": "rgb(173, 173, 173)" });
        $("#instruct").text("Get Ready to Fight!");
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
            oppEmpt = true;

            oppHP = parseInt($("#third>.char>.charHP").text());
            oppAtt = parseInt($("#third>span").attr("cap"));
            oppName = $("#third>.char>.name").text();
            oppNum--;

            if (oppNum === 0) {
                $("#instruct").text("You won! Great job!");
                gameEnd = true;
                $("#button_contain").append('<button type="button" class="btn btn-success" id="new_game_btn">New Game</button>');
            }

        } else if (heroHP <= 0) {
            $("#instruct").text("Oh no! you lost!");
            gameEnd = true;
            $("#button_contain").append('<button type="button" class="btn btn-success" id="new_game_btn">New Game</button>');
        }
    }

});
// restart button
$("#new_game_btn").click(function (e) {
    heroHP = 0;
    oppHP = 0;
    heroAtt = 0;
    oppAtt = 0;
    oppNum = 3;
    playerEmpt = true;
    oppEmpt = true;
    gameEnd = false;

    if (condition) {
    }
});

// 3. The player will keep hitting the attack button in an effort to defeat their opponent.

//    * When the defender's `HP` is reduced to zero or below, remove the enemy from the `defender area`. The player character can now choose a new opponent.

// 4. The player wins the game by defeating all enemy characters. The player loses the game the game if their character's `HP` falls to zero or below.

// ##### Option 2 Game design notes

// * Each character in the game has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power`.

// * Each time the player attacks, their character's Attack Power increases by its base Attack Power. 
//   * For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).
// * The enemy character only has `Counter Attack Power`. 

//   * Unlike the player's `Attack Points`, `Counter Attack Power` never changes.

// * The `Health Points`, `Attack Power` and `Counter Attack Power` of each character must differ.

// * No characters in the game can heal or recover Health Points. 

//   * A winning player must pick their characters wisely by first fighting an enemy with low `Counter Attack Power`. This will allow them to grind `Attack Power` and to take on enemies before they lose all of their `Health Points`. Healing options would mess with this dynamic.

// * Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.
