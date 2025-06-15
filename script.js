
let currentQuestionIndex = 0;
let lives = 3;
const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer");
const livesDisplay = document.getElementById("lives");

function displayQuestion() {
    questionElement.innerText = questions[currentQuestionIndex].question;
    answerInput.value = "";
}

function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();
    if (userAnswer === correctAnswer) {
        showConfetti();
        setTimeout(() => {
            currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
            displayQuestion();
        }, 3000);
    } else {
        lives--;
        livesDisplay.textContent = lives;
        if (lives === 0) {
            alert("Game Over!");
            restartGame();
        }
    }
}

function restartGame() {
    currentQuestionIndex = 0;
    lives = 3;
    livesDisplay.textContent = lives;
    displayQuestion();
}

function showConfetti() {
    const confetti = document.getElementById("confetti-canvas");
    const ctx = confetti.getContext("2d");
    confetti.width = window.innerWidth;
    confetti.height = window.innerHeight;
    const pieces = Array.from({ length: 20 }, () => ({
        x: Math.random() * confetti.width,
        y: Math.random() * confetti.height,
        radius: Math.random() * 6 + 4,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`
    }));
    let frame = 0;
    function draw() {
        ctx.clearRect(0, 0, confetti.width, confetti.height);
        pieces.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        if (++frame < 90) requestAnimationFrame(draw);
    }
    draw();
}

displayQuestion();
