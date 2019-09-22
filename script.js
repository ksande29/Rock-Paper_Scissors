//- - - - - - - - - VARIABLES - - - - - - - - - - 
//game variables
var isNewGame;
var isGameOver;
var yourSelection;
var compSelection;
var displayWinnerName;
var gameWinner;
var round;
var totalNumRounds;
var yourScore;
var compScore;

//variables to store elements
var selectDiv = document.getElementById("selection");
var rockBtn = document.getElementById("rockBtn");
var paperBtn = document.getElementById("paperBtn");
var scissorsBtn = document.getElementById("scissorsBtn");
var newGameBtn = document.getElementById("newGameBtn");
var scoreDiv = document.getElementById("score");
var imgDiv = document.getElementById("pictures");
var yourImg = document.getElementById("player").childNodes[1];
var compImg = document.getElementById("computer").childNodes[1];
var yourTxt = document.getElementById("player").childNodes[3];
var compTxt = document.getElementById("computer").childNodes[3];
var winnerDiv = document.getElementById("winner");

//- - - - - - - - - Game Code - - - - - - - - - - 
//set up a new game when the page loads
newGame();

//reset game when new game button is clicked
newGameBtn.addEventListener("click", function() {  newGame()    });

//get user choice when a button is clicked
rockBtn.addEventListener("click", function() {  takeTurn("rock")    });
paperBtn.addEventListener("click", function() {  takeTurn("paper")    });
scissorsBtn.addEventListener("click", function() {  takeTurn("scissors")    });

//- - - - - - - - - Functions - - - - - - - - - - 
//set up a new game
function newGame() {
    //console.log("new game");

    //reset game variables
    isNewGame = true;
    isGameOver = false;
    yourSelection = null;
    compSelection = null;
    displayWinnerName = "no winner";
    gameWinner = "null";
    round = 1;
    totalNumRounds = 10;
    yourScore = 0;
    compScore = 0;  

    //update display
    updateDisplay();
 
}

function endGame() {
    //console.log("game is over");
    getWinner();

    //update display
    isGameOver = true;
    updateDisplay();
}

function getWinner() {
    if (yourScore > compScore) {
        gameWinner = "you";
    } else if (compScore > yourScore) {
        gameWinner = "the computer";
    } else {
        gameWinner = "no winner";
    }
}

//take a turn
function takeTurn(choice) {              
    //user makes a selection
    userMakeSelection(choice);

    //computer makes a selection
    compMakeSelection();

    //see who won the round
    checkForRoundWin();

    //update display
    updateDisplay();

    //update round number
    round++;

    //end game if out of rounds 
     if (round === totalNumRounds + 1) {
        endGame();
    }
}

//get user choice
function userMakeSelection(choice) {
    yourSelection = choice;
    //console.log("You chose: " + yourSelection);
}

//get computer choice
function compMakeSelection() {
    //generate a random number between 0 and 2
    let randNum = Math.floor(Math.random() * 3);
    //console.log(randNum);
    if (randNum === 0) {
        compSelection = "rock";
    } else if (randNum === 1) {
        compSelection = "paper";
    } else {
        compSelection = "scissors";
    }
    //console.log("computer chose: " + compSelection);
} 

//see who won the round
function checkForRoundWin() {
    //tie
    if (yourSelection === compSelection) {
        //console.log("the game is a tie")
        displayWinnerName = "no winner";
    }; 
    //computer win
    if ( (compSelection === "rock" && yourSelection === "scissors")
        || (compSelection === "paper" && yourSelection === "rock")
        || (compSelection === "scissors" && yourSelection === "paper") ){
            //console.log("The computer wins")
            displayWinnerName = "the computer";
            compScore++;
        };
    //you win
    if ( (yourSelection === "rock" && compSelection === "scissors")
        || (yourSelection === "paper" && compSelection === "rock")
        || (yourSelection === "scissors" && compSelection === "paper") ){
            //console.log("You win")
            displayWinnerName = "you";
            yourScore++;
        };
}

//update display 
function updateDisplay() {   
    //new game - reset display - hide selection display, score display, and winner display
    if (isNewGame) {
        //reset display - make selection options visible
        selectDiv.classList.remove("hidden"); 

        //reset display - make round and score visible 
        scoreDiv.childNodes[1].classList.remove("hidden"); 
        scoreDiv.childNodes[3].classList.remove("hidden"); 
        scoreDiv.childNodes[5].classList.remove("hidden"); 

        //hide selections and images
        imgDiv.classList.remove("parent");
        imgDiv.classList.add("hidden");     
        yourImg.src = "paper.jpg";
        compImg.src = "paper.jpg"; 
        yourTxt.innerHTML = ""; 
        compTxt.innerHTML = ""; 

        //hide round winner message
        winnerDiv.classList.add("hidden");
        isNewGame = false;
    }
    //game is over
    else if (isGameOver) {
        selectDiv.classList.add("hidden"); 
        winnerDiv.innerHTML = "Round " + (round-1) + " goes to: " + displayWinnerName + "<br> the winner of the game is: " + gameWinner;
    }
    //update user and computer selection display
    else {
        //make selection and images visible & update images and selection messages
        imgDiv.classList.remove("hidden");
        imgDiv.classList.add("parent"); 
        
        yourImg.src = yourSelection + ".jpg";
        compImg.src = compSelection + ".jpg"; 

        yourTxt.innerHTML = "you chose: " + yourSelection; 
        compTxt.innerHTML = "the computer chose: " + compSelection; 

        //show round winner
        winnerDiv.classList.remove("hidden");
        winnerDiv.innerHTML = "Round " + (round) + " goes to: " + displayWinnerName;
    }

    //show current scores
    scoreDiv.childNodes[3].innerHTML = "player: " + yourScore;
    scoreDiv.childNodes[5].innerHTML = "computer " + compScore;
}