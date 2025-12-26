let score = 0;
const totalQuestions = 28;

function submitExam() {
    // Collect answers
    const userName = prompt("Enter your name:");
    let score = 0;

    for (let i = 1; i <= totalQuestions; i++) {
        const question = document.querySelector(`input[name="q${i}"]:checked`);
        if (question) {
            // Correct answers (modify this according to correct options)
            if ((i === 1 && question.value === "A") || 
                (i === 2 && question.value === "B") ||
                (i === 26 && question.value === "A") ||
                (i === 27 && question.value === "B") ||
                (i === 28 && question.value === "C")) {
                score++;
            }
        }
    }

    // Send data to Google Script
    fetch("https://script.google.com/macros/s/AKfycbx-ud_iMT7jQgS4UUUQNZWw7uIslX7I4hI_ItBRbqIXGFAIfJ4asMOQN5AWvBm1X6FXDg/exec", {
        method: "POST",
        body: JSON.stringify({
            name: userName,
            score: score,
            total: totalQuestions
        })
    })
    .then(response => alert("Exam submitted! Your score: " + score + "/" + totalQuestions))
    .catch(error => { console.error("Request failed", error); alert("An error occurred. Please try again."); });
}
