let timeLeft = 50 * 60; 
const timerElement = document.getElementById('timer');
const examForm = document.getElementById('exam-form');

// Timer Logic
const timerInterval = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerElement.innerHTML = `${minutes}:${seconds}`;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert("Time is up! Submitting automatically.");
        examForm.requestSubmit(); 
    }
    timeLeft--;
}, 1000);

// Answer Key
function calculateScore() {
    let score = 0;
    const answers = {
        q1: "C", q2: "B", q3: "C", q4: "B", q5: "B",
        q6: "C", q7: "B", q8: "C", q9: "B", q10: "C",
        q11: "B", q12: "B", q13: "B", q14: "C", q15: "B",
        q16: "B", q17: "C", q18: "C", q19: "B", q20: "C",
        q21: "C", q22: "B", q23: "C", q24: "B", q25: "C",
        q26: "C", q27: "B", q28: "C"
    };

    for (let i = 1; i <= 28; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === answers[`q${i}`]) {
            score++;
        }
    }
    return score;
}

// Submission Logic
examForm.addEventListener('submit', function(e) {
    // Prevent default to allow prompt, then submit manually
    e.preventDefault();

    const userName = prompt("Please enter your full name to finish:");
    if (!userName) {
        alert("Submission cancelled. Student name is required.");
        return;
    }

    const finalScore = calculateScore();
    const timeSpent = 50 - Math.floor(timeLeft / 60);

    // Populate hidden fields for Formspree
    document.getElementById('form-name').value = userName;
    document.getElementById('form-score').value = `${finalScore} / 28`;
    document.getElementById('form-time').value = `${timeSpent} minutes used`;

    // Send to Formspree
    this.submit();
});
