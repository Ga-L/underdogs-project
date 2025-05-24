const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {}
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let personalityScores = {
    Bold: 0,
    Strategist: 0,
    Joker: 0,
    Improviser: 0
};



let questions = [
    {
      question: "You’re facing a challenge. What’s your go-to move?",
      choice1: "Break into a power pose and go for it.",
      choice2: "Analyze everything before making a move.",
      choice3: "Make a joke—humor gets you through.",
      choice4: "Wing it. You trust the chaos.",
      personalityType: ["Bold", "Strategist", "Joker", "Improviser"]
    },
    {
      question: "When the pressure’s on, you...",
      choice1: "Step up fearlessly and take charge.",
      choice2: "Plot your moves like a chess master.",
      choice3: "Lighten the mood with a quick joke.",
      choice4: "Adapt on the fly, no plan needed.",
      personalityType: ["Bold", "Strategist", "Joker", "Improviser"]
    },
    {
      question: "Your friends describe you as the one who...",
      choice1: "Leads with confidence and courage.",
      choice2: "Thinks three steps ahead.",
      choice3: "Always makes everyone laugh.",
      choice4: "Can handle whatever curveball life throws.",
      personalityType: ["Bold", "Strategist", "Joker", "Improviser"]
    },
    {
      question: "If you had a signature move, it would be...",
      choice1: "Taking bold risks with no hesitation.",
      choice2: "Crafting the perfect plan before acting.",
      choice3: "Dropping a hilarious one-liner at the right time.",
      choice4: "Freestyling your way through every situation.",
      personalityType: ["Bold", "Strategist", "Joker", "Improviser"]
    },
    {
      question: "Pick the best description of your mindset:",
      choice1: "Go big or go home!",
      choice2: "Every step counts, plan it well.",
      choice3: "Life’s better when you’re laughing.",
      choice4: "Roll with the punches and keep moving. Viv li!",
      personalityType: ["Bold", "Strategist", "Joker", "Improviser"]
    },
    {
      question: "How do you handle setbacks?",
      choice1: "Face them head-on and push harder.",
      choice2: "Reassess, strategize, and try again smarter.",
      choice3: "Make a joke to ease the tension.",
      choice4: "Switch tactics and improvise your way out.",
      personalityType: ["Bold", "Strategist", "Joker", "Improviser"]
    },
    {
      question: "Your perfect weekend looks like:",
      choice1: "Trying something daring and new.",
      choice2: "Planning a project or learning something.",
      choice3: "Going to comedy shows or hanging with funny friends.",
      choice4: "Spontaneous adventures with no plans.",
      personalityType: ["Bold", "Strategist", "Joker", "Improviser"]
    },
    {
      question: "If life was a game, you’d be the player who:",
      choice1: "Life is not a game! Nou manz ar li!",
      choice2: "Calculates every move for maximum gain.",
      choice3: "Distracts opponents with humor and wins hearts.",
      choice4: "Adapts instantly and keeps everyone guessing.",
      personalityType: ["Bold", "Strategist", "Joker", "Improviser"]
    }
];

const MAX_QUESTIONS = 8;

startGame = () => {
    questionCounter = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign('/end.html'); // You can define this later
      }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if (!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset["number"];
            
            getNewQuestion();

        });
    });
};

startGame();

  

  