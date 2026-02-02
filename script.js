// AI Ultimate Quiz JS

const aiLines = [
  "Nice choice, my dear 😌",
  "Hmm… interesting question 🤔",
  "You’re doing great, trust me 😉",
  "Your brain is glowing ✨",
  "Let’s see what you know now 👀"
];

const questionsPool = [
  {q:"What is the capital of India?", o:["Mumbai","Delhi","Kolkata","Chennai"], a:"Delhi"},
  {q:"Which planet is known as the Red Planet?", o:["Earth","Mars","Jupiter","Venus"], a:"Mars"},
  {q:"Who invented the telephone?", o:["Newton","Edison","Bell","Tesla"], a:"Bell"},
  {q:"Largest ocean in the world?", o:["Indian","Atlantic","Pacific","Arctic"], a:"Pacific"},
  {q:"Which gas do humans breathe in?", o:["Oxygen","Carbon","Nitrogen","Helium"], a:"Oxygen"},
  {q:"National animal of India?", o:["Lion","Tiger","Elephant","Leopard"], a:"Tiger"},
  {q:"Fastest land animal?", o:["Horse","Cheetah","Tiger","Dog"], a:"Cheetah"},
  {q:"Who wrote Harry Potter?", o:["Tolkien","Rowling","Lewis","Martin"], a:"Rowling"},
  {q:"How many continents are there?", o:["5","6","7","8"], a:"7"},
  {q:"Sun is a…?", o:["Planet","Star","Moon","Asteroid"], a:"Star"},
  {q:"Which element has chemical symbol 'O'?", o:["Oxygen","Gold","Osmium","Iron"], a:"Oxygen"},
  {q:"Who painted the Mona Lisa?", o:["Van Gogh","Da Vinci","Picasso","Rembrandt"], a:"Da Vinci"},
  {q:"H2O is the chemical formula for…?", o:["Water","Salt","Sugar","Oxygen"], a:"Water"},
];

let quiz = [];
let index = 0;
let score = 0;
let timer;
let timeLeft = 15;
let name = "";

function startQuiz(){
  name = document.getElementById("nameInput").value || "My Dear";
  quiz = questionsPool.sort(()=>0.5-Math.random()).slice(0,10);

  document.getElementById("startBox").classList.add("hidden");
  document.getElementById("quizBox").classList.remove("hidden");

  index = 0; score = 0;
  loadQuestion();
}

function loadQuestion(){
  document.getElementById("aiText").innerText =
    aiLines[Math.floor(Math.random()*aiLines.length)];

  document.getElementById("qNum").innerText = index + 1;

  const q = quiz[index];
  document.getElementById("question").innerText = q.q;

  const optionsBox = document.getElementById("options");
  optionsBox.innerHTML = "";

  q.o.forEach(opt=>{
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = ()=>check(opt);
    optionsBox.appendChild(btn);
  });

  startTimer();
}

function startTimer(){
  clearInterval(timer);
  timeLeft = 15;
  document.getElementById("timer").innerText = timeLeft;
  timer = setInterval(()=>{
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;
    if(timeLeft <= 0){
      clearInterval(timer);
      check(null);
    }
  },1000);
}

function check(answer){
  clearInterval(timer);
  const correct = quiz[index].a;
  if(answer === correct){
    score += 10;
    confetti();
    new Audio('https://freesound.org/data/previews/569/569942_11059515-lq.mp3').play();
  } else {
    new Audio('https://freesound.org/data/previews/331/331912_3248244-lq.mp3').play();
  }

  index++;
  if(index < quiz.length){
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz(){
  document.getElementById("quizBox").classList.add("hidden");
  document.getElementById("resultBox").classList.remove("hidden");

  document.getElementById("finalMsg").innerText =
    `Well done, ${name} 💙`;

  document.getElementById("scoreText").innerText =
    `Your General Knowledge Score: ${score} / 100`;

  saveLeaderboard();
  renderLeaderboard();
}

// Local leaderboard
function saveLeaderboard(){
  const lb = JSON.parse(localStorage.getItem("aiQuizLB")||"[]");
  lb.push({name,score});
  lb.sort((a,b)=>b.score-a.score);
  localStorage.setItem("aiQuizLB", JSON.stringify(lb.slice(0,10)));
}

function renderLeaderboard(){
  const lb = JSON.parse(localStorage.getItem("aiQuizLB")||"[]");
  const ul = document.getElementById("leaderboard");
  ul.innerHTML = "";
  lb.forEach(e=>{
    const li = document.createElement("li");
    li.innerText = `${e.name} - ${e.score}`;
    ul.appendChild(li);
  });
}