const questions = [
  {
    question: "ما هو أكبر حيوان في العالم؟",
    answers: [
      { text: "القرش", correct: false },
      { text: "الحوت الأزرق", correct: true },
      { text: "الفيل", correct: false },
      { text: "الزرافة", correct: false },
    ],
  },
  {
    question: "ما هي أصغر قارة في العالم؟",
    answers: [
      { text: "آسيا", correct: false },
      { text: "أستراليا", correct: true },
      { text: "القطب الشمالي", correct: false },
      { text: "أفريقيا", correct: false },
    ],
  },
  {
    question: "ما هو أعلى جبل في العالم؟",
    answers: [
      { text: "إيفرست", correct: true },
      { text: "كيليمانجارو", correct: false },
      { text: "أنابورنا", correct: false },
      { text: "ماوناكيا", correct: false },
    ],
  },
  {
    question: "ما هو أطول نهر في العالم؟",
    answers: [
      { text: "النيل", correct: true },
      { text: "الأمازون", correct: false },
      { text: "الميسيسيبي", correct: false },
      { text: "يانغتسي", correct: false },
    ],
  },
  {
    question: "ما هي أكبر دولة في العالم؟",
    answers: [
      { text: "روسيا", correct: true },
      { text: "الصين", correct: false },
      { text: "الولايات المتحدة الأمريكية", correct: false },
      { text: "البرازيل", correct: false },
    ],
  },
  {
    question: "ما هي عاصمة فرنسا؟",
    answers: [
      { text: "باريس", correct: true },
      { text: "برلين", correct: false },
      { text: "روما", correct: false },
      { text: "مدريد", correct: false },
    ],
  },
  {
    question: "من هو أول رجل مشى على القمر؟",
    answers: [
      { text: "نيل أرمسترونغ", correct: true },
      { text: "باز ألدرين", correct: false },
      { text: "مايكل كولينز", correct: false },
      { text: "يوري غاغارين", correct: false },
    ],
  },
  {
    question: "ما هو لون الشمس؟",
    answers: [
      { text: "الأبيض", correct: true },
      { text: "الأصفر", correct: false },
      { text: "الأحمر", correct: false },
      { text: "البرتقالي", correct: false },
    ],
  },
  {
    question: "ما هو عدد الكواكب في النظام الشمسي؟",
    answers: [
      { text: "8", correct: true },
      { text: "9", correct: false },
      { text: "7", correct: false },
      { text: "10", correct: false },
    ],
  },
  {
    question: "ما هو الحيوان الذي يملك أكبر عدد من الأسنان؟",
    answers: [
      { text: "الدلفين", correct: true },
      { text: "الحوت الأزرق", correct: false },
      { text: "الفيل", correct: false },
      { text: "الزرافة", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButtons = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButtons.innerHTML = "next"
    nextButtons.style.display = "none"
    showQuestion();
}
function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    const shuffledAnswers = currentQuestion.answers.sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;

        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedButton = e.target;
    isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect){
        selectedButton.classList.add("correct");
        score++;
    }else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButtons.style.display = "block"
}
function showScore(){
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButtons.innerHTML = "Play Again"
    nextButtons.style.display = "block"
}
function handleNextButton(){
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}
nextButtons.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }else{
        startQuiz()
    }
})

startQuiz();