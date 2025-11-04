const nameInputContainer = document.getElementById('name-input-container');
const nameInput = document.getElementById('player-name');
const submitNameBtn = document.getElementById('submit-name');
const startButton = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');
const bgMusic = document.getElementById('bg-music');
const correctSound = document.getElementById('correct-sound');

let playerName = "";
let currentQuestionIndex = 0;
let score = 0;

// Tombol Soal Berikutnya
const nextButton = document.createElement('button');
nextButton.innerText = "Soal Berikutnya";
nextButton.style.display = "none";
nextButton.style.fontSize = "18px";
nextButton.style.padding = "12px 20px";
nextButton.style.cursor = "pointer";
nextButton.style.borderRadius = "10px";
nextButton.style.backgroundColor = "#ffdd57";
nextButton.style.color = "black";
answerButtonsElement.parentNode.appendChild(nextButton);

// ==== Slide Skor ====
const resultSlide = document.createElement('div');
resultSlide.id = 'result-slide';
resultSlide.style.display = 'none';
resultSlide.style.backgroundColor = "rgba(0,0,0,0.7)";
resultSlide.style.color = "#ffdd57";
resultSlide.style.padding = "40px";
resultSlide.style.borderRadius = "20px";
resultSlide.style.textAlign = "center";
resultSlide.style.marginTop = "30px";
resultSlide.innerHTML = `
    <h2 id="result-title">Hasil Game 🎉</h2>
    <p id="final-score"></p>
    <button id="restart-btn">Main Lagi</button>
`;
document.getElementById('game-container').appendChild(resultSlide);

const finalScoreText = document.getElementById('final-score');
const restartButton = document.getElementById('restart-btn');

// ==== 10 soal barisan & deret aritmetika ====
const questions = [
    {question:"Diketahui: a=3, b=2, n=5. Hitung suku ke-5 (Un)?",
     answers:[{text:"11",correct:true},{text:"12",correct:false},{text:"10",correct:false},{text:"13",correct:false}]},
    {question:"Diketahui: a=1, b=4, n=4. Hitung suku ke-4 (Un)?",
     answers:[{text:"13",correct:true},{text:"9",correct:false},{text:"10",correct:false},{text:"12",correct:false}]},
    {question:"Diketahui: a=2, b=3, n=5. Hitung jumlah 5 suku pertama (Sn)?",
     answers:[{text:"40",correct:true},{text:"35",correct:false},{text:"30",correct:false},{text:"45",correct:false}]},
    {question:"Diketahui: a=2, b=5, n=4. Hitung suku ke-4 (Un)?",
     answers:[{text:"17",correct:true},{text:"15",correct:false},{text:"16",correct:false},{text:"18",correct:false}]},
    {question:"Diketahui: a=1, b=2, n=4. Hitung jumlah 4 suku pertama (Sn)?",
     answers:[{text:"14",correct:true},{text:"16",correct:false},{text:"15",correct:false},{text:"12",correct:false}]},
    {question:"Diketahui: a=5, b=1, n=6. Hitung suku ke-6 (Un)?",
     answers:[{text:"10",correct:true},{text:"9",correct:false},{text:"11",correct:false},{text:"12",correct:false}]},
    {question:"Diketahui: a=3, b=2, n=6. Hitung jumlah 6 suku pertama (Sn)?",
     answers:[{text:"33",correct:true},{text:"30",correct:false},{text:"31",correct:false},{text:"32",correct:false}]},
    {question:"Diketahui: a=1, b=3, n=5. Hitung suku ke-5 (Un)?",
     answers:[{text:"13",correct:true},{text:"12",correct:false},{text:"14",correct:false},{text:"15",correct:false}]},
    {question:"Diketahui: a=2, b=2, n=3. Hitung jumlah 3 suku pertama (Sn)?",
     answers:[{text:"12",correct:true},{text:"10",correct:false},{text:"14",correct:false},{text:"16",correct:false}]},
    {question:"Diketahui: a=4, b=3, n=5. Hitung suku ke-5 (Un)?",
     answers:[{text:"16",correct:true},{text:"15",correct:false},{text:"17",correct:false},{text:"18",correct:false}]}
];

// ==== SUBMIT NAMA ====
submitNameBtn.addEventListener('click', ()=>{
    if(nameInput.value.trim() !== ""){
        playerName = nameInput.value.trim();
        nameInputContainer.style.display = "none";
        startButton.style.display = "inline-block";
        startButton.innerText = `Mulai Game ${playerName} 🎮`;
        startButton.style.fontSize = "22px";
        startButton.style.fontWeight = "bold";
        startButton.style.backgroundColor = "#ffdd57";
        startButton.style.color = "black";
    } else {
        alert("Isi namamu terlebih dahulu!");
    }
});

// ==== START GAME ====
startButton.addEventListener('click', ()=>{
    score = 0;
    currentQuestionIndex = 0;
    startButton.style.display = "none";
    bgMusic.play();
    showQuestion();
    updateScore();
});

// ==== SHOW QUESTION ====
function showQuestion(){
    nextButton.style.display = "none";
    answerButtonsElement.innerHTML = '';
    const q = questions[currentQuestionIndex];
    questionElement.innerText = q.question;
    questionElement.style.color = "#ffdd57";
    questionElement.style.fontSize = "20px";
    questionElement.style.fontWeight = "bold";

    q.answers.sort(()=>Math.random()-0.5).forEach(ans=>{
        const btn = document.createElement('button');
        btn.innerText = ans.text;
        btn.classList.add('answer-btn');
        btn.dataset.correct = ans.correct;
        btn.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(btn);
    });
}

// ==== SELECT ANSWER ====
function selectAnswer(e){
    const selected = e.target;
    const correct = selected.dataset.correct === "true";

    if(correct){
        selected.classList.add('correct');
        score++;
        updateScore();
        spawnConfetti();
        correctSound.play();
    } else {
        selected.classList.add('wrong');
    }

    Array.from(answerButtonsElement.children).forEach(btn=>{
        btn.disabled = true;
        if(btn.dataset.correct==="true") btn.classList.add('correct');
    });

    nextButton.style.display = "inline-block";
}

// ==== NEXT QUESTION ====
nextButton.addEventListener('click', ()=>{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showResultSlide();
    }
});

// ==== SHOW RESULT SLIDE ====
function showResultSlide(){
    answerButtonsElement.innerHTML = '';
    questionElement.innerText = '';
    nextButton.style.display = "none";
    resultSlide.style.display = "block";
    finalScoreText.innerText = `🎓 ${playerName}, Skor Kamu: ${score} / ${questions.length}`;
}

// ==== UPDATE SCORE ====
function updateScore(){
    scoreElement.innerText = `Skor ${playerName}: ${score}`;
}

// ==== CONFETTI ====
function spawnConfetti(){
    for(let i=0;i<30;i++){
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = `hsl(${Math.random()*360},100%,50%)`;
        confetti.style.left = Math.random()*window.innerWidth + 'px';
        confetti.style.animationDuration = 1 + Math.random()*2 + 's';
        document.body.appendChild(confetti);
    }
    setTimeout(()=>{ document.querySelectorAll('.confetti').forEach(c=>c.remove()); },2000);
}

// ==== RESTART GAME ====
restartButton.addEventListener('click', ()=>{
    resultSlide.style.display = 'none';
    nameInputContainer.style.display = 'flex';
    startButton.style.display = 'none';
    score = 0;
    currentQuestionIndex = 0;
    updateScore();
});
