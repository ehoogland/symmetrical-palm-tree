let questionDiv = document.getElementById('question');
let answerDiv = document.getElementById('answer');
let feedbackDiv = document.getElementById('feedback');
// stores the question that is returned from the Promise
let currentQuestion = null;

function getTriviaQuestion() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = Math.floor(Math.random() * questions.length);
            const question = questions[index];
            if (index > questions.length) {
                reject('An error occurred while fetching the trivia question.')
            } else {
                resolve(question);
            }
        }, 1000); // Delay of one second
    });
}
// Function that takes a triviaQuestion object and displays the trivia question
function displayQuestion(triviaQuestion) {
    questionDiv.textContent = triviaQuestion.question;
    answerDiv.textContent = ''; // Clear previous answers
    feedbackDiv.textContent = ''; // Clear previous feedback
}

document.querySelector('#questionBtn').addEventListener('click', () => {
    
    // Call the getTriviaQuestion function to fetch a new trivia question
        getTriviaQuestion().then(question => { // get a random trivia question
            currentQuestion = question;// update the currentQuestion variable
            displayQuestion(question); // call the displayQuestion function and pass the question as an argument
        }).catch(error => {
            console.error(error);

    });
});


document.querySelector('#answerBtn').addEventListener('click', () => {

    let feedbackMessage; // temporary variable to store a message
    const userAnswer = answerDiv.value.trim().toLowerCase(); // Get the user's answer and trim whitespace
    if (currentQuestion && userAnswer === currentQuestion.answer.toLowerCase()) {
        feedbackDiv.style.color = 'green'; // Change text color to green for correct answer
        feedbackMessage = 'Great job! Your answer is correct!';
    } else {
        feedbackDiv.style.color = 'red'; // Change text color to red for incorrect answer
        // Provide the correct answer in the feedback message
        feedbackMessage = `Sorry, that is incorrect. The correct answer is: "${currentQuestion.answer}." Try another question!`;
    }
    feedbackDiv.textContent = feedbackMessage; // Display feedback message
    answerDiv.value = ''; // Clear the answer input field
    questionDiv.textContent = ''; // Clear the question display
    currentQuestion = null; // Reset the current question
    console.log(feedbackMessage); // Log the feedback message to the console
});``