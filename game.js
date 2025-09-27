

// Sacrifice Among Friends - 2D Canvas Game
const screens = {
  menu: document.getElementById('menu-screen'),
  game: document.getElementById('game-screen'),
  end: document.getElementById('end-screen')
};

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const friends = [
  { name: 'Sonia', color: '#e74c3c', health: 100, morale: 100 },
  { name: 'Ari', color: '#3498db', health: 100, morale: 100 },
  { name: 'Stefi', color: '#f1c40f', health: 100, morale: 100 }
];

const tasks = [
  { desc: 'You find a wounded animal. Do you help it, risking infection, or leave it to suffer? (Helping: -30 health to all, +20 morale to all. Leaving: -40 morale to all)', choices: [ { label: 'Help the animal', effect: [ { friend: 0, health: -30, morale: +20 }, { friend: 1, health: -30, morale: +20 }, { friend: 2, health: -30, morale: +20 } ] }, { label: 'Leave it', effect: [ { friend: 0, morale: -40 }, { friend: 1, morale: -40 }, { friend: 2, morale: -40 } ] } ] },
  { desc: 'A stranger offers food, but only if you betray one friend. Who do you betray? (Betrayed: -50 morale, others: +30 health)', choices: [ { label: 'Betray Sonia', effect: [ { friend: 0, morale: -50 }, { friend: 1, health: +30 }, { friend: 2, health: +30 } ] }, { label: 'Betray Ari', effect: [ { friend: 1, morale: -50 }, { friend: 0, health: +30 }, { friend: 2, health: +30 } ] }, { label: 'Betray Stefi', effect: [ { friend: 2, morale: -50 }, { friend: 0, health: +30 }, { friend: 1, health: +30 } ] } ] },
  { desc: 'You must cross a freezing river. Who risks hypothermia? (Chosen: -60 health, others: -20 morale)', choices: [ { label: 'Sonia crosses', effect: [ { friend: 0, health: -60 }, { friend: 1, morale: -20 }, { friend: 2, morale: -20 } ] }, { label: 'Ari crosses', effect: [ { friend: 1, health: -60 }, { friend: 0, morale: -20 }, { friend: 2, morale: -20 } ] }, { label: 'Stefi crosses', effect: [ { friend: 2, health: -60 }, { friend: 0, morale: -20 }, { friend: 1, morale: -20 } ] } ] },
  { desc: 'A fire breaks out. Who will run into danger to save supplies? (Chosen: -50 health, others: +20 morale)', choices: [ { label: 'Sonia saves supplies', effect: [ { friend: 0, health: -50 }, { friend: 1, morale: +20 }, { friend: 2, morale: +20 } ] }, { label: 'Ari saves supplies', effect: [ { friend: 1, health: -50 }, { friend: 0, morale: +20 }, { friend: 2, morale: +20 } ] }, { label: 'Stefi saves supplies', effect: [ { friend: 2, health: -50 }, { friend: 0, morale: +20 }, { friend: 1, morale: +20 } ] } ] },
  { desc: 'You are lost. Who will climb a cliff to scout ahead? (Chosen: -40 health, -20 morale)', choices: [ { label: 'Sonia scouts', effect: [ { friend: 0, health: -40, morale: -20 } ] }, { label: 'Ari scouts', effect: [ { friend: 1, health: -40, morale: -20 } ] }, { label: 'Stefi scouts', effect: [ { friend: 2, health: -40, morale: -20 } ] } ] },
  { desc: 'A blizzard hits. Who will go out to find shelter? (Chosen: -70 health, others: +30 morale)', choices: [ { label: 'Sonia finds shelter', effect: [ { friend: 0, health: -70 }, { friend: 1, morale: +30 }, { friend: 2, morale: +30 } ] }, { label: 'Ari finds shelter', effect: [ { friend: 1, health: -70 }, { friend: 0, morale: +30 }, { friend: 2, morale: +30 } ] }, { label: 'Stefi finds shelter', effect: [ { friend: 2, health: -70 }, { friend: 0, morale: +30 }, { friend: 1, morale: +30 } ] } ] },
  { desc: 'You find a map, but it’s written in a language only one friend understands. Who will take the risk to decipher it? (Chosen: -30 morale, others: +20 health)', choices: [ { label: 'Sonia deciphers', effect: [ { friend: 0, morale: -30 }, { friend: 1, health: +20 }, { friend: 2, health: +20 } ] }, { label: 'Ari deciphers', effect: [ { friend: 1, morale: -30 }, { friend: 0, health: +20 }, { friend: 2, health: +20 } ] }, { label: 'Stefi deciphers', effect: [ { friend: 2, morale: -30 }, { friend: 0, health: +20 }, { friend: 1, health: +20 } ] } ] },
  { desc: 'A bridge is about to collapse. Who will stay behind to hold it for the others? (Chosen: -80 health, others: +40 morale)', choices: [ { label: 'Sonia holds bridge', effect: [ { friend: 0, health: -80 }, { friend: 1, morale: +40 }, { friend: 2, morale: +40 } ] }, { label: 'Ari holds bridge', effect: [ { friend: 1, health: -80 }, { friend: 0, morale: +40 }, { friend: 2, morale: +40 } ] }, { label: 'Stefi holds bridge', effect: [ { friend: 2, health: -80 }, { friend: 0, morale: +40 }, { friend: 1, morale: +40 } ] } ] },
  { desc: 'You find a lost child. Do you help them, risking delay, or ignore them? (Help: -20 morale to all, +20 health to all. Ignore: -40 morale to all)', choices: [ { label: 'Help the child', effect: [ { friend: 0, morale: -20, health: +20 }, { friend: 1, morale: -20, health: +20 }, { friend: 2, morale: -20, health: +20 } ] }, { label: 'Ignore', effect: [ { friend: 0, morale: -40 }, { friend: 1, morale: -40 }, { friend: 2, morale: -40 } ] } ] },
  { desc: 'A friend is injured. Do you slow down for them, risking everyone, or leave them behind? (Slow: -30 health to all, Leave: -80 morale to one)', choices: [ { label: 'Slow down for Sonia', effect: [ { friend: 0, health: -30 }, { friend: 1, health: -30 }, { friend: 2, health: -30 } ] }, { label: 'Leave Sonia', effect: [ { friend: 0, morale: -80 } ] }, { label: 'Slow down for Ari', effect: [ { friend: 0, health: -30 }, { friend: 1, health: -30 }, { friend: 2, health: -30 } ] }, { label: 'Leave Ari', effect: [ { friend: 1, morale: -80 } ] }, { label: 'Slow down for Stefi', effect: [ { friend: 0, health: -30 }, { friend: 1, health: -30 }, { friend: 2, health: -30 } ] }, { label: 'Leave Stefi', effect: [ { friend: 2, morale: -80 } ] } ] },
  { desc: 'You find a poisonous plant. Who will test if it’s edible? (Chosen: -60 health, others: +20 morale)', choices: [ { label: 'Sonia tests', effect: [ { friend: 0, health: -60 }, { friend: 1, morale: +20 }, { friend: 2, morale: +20 } ] }, { label: 'Ari tests', effect: [ { friend: 1, health: -60 }, { friend: 0, morale: +20 }, { friend: 2, morale: +20 } ] }, { label: 'Stefi tests', effect: [ { friend: 2, health: -60 }, { friend: 0, morale: +20 }, { friend: 1, morale: +20 } ] } ] },
  { desc: 'A storm is coming. Who will build shelter? (Chosen: -40 morale, others: +30 health)', choices: [ { label: 'Sonia builds', effect: [ { friend: 0, morale: -40 }, { friend: 1, health: +30 }, { friend: 2, health: +30 } ] }, { label: 'Ari builds', effect: [ { friend: 1, morale: -40 }, { friend: 0, health: +30 }, { friend: 2, health: +30 } ] }, { label: 'Stefi builds', effect: [ { friend: 2, morale: -40 }, { friend: 0, health: +30 }, { friend: 1, health: +30 } ] } ] },
  { desc: 'You find a raft. Only two can ride. Who swims? (Swimmer: -70 health, others: +40 morale)', choices: [ { label: 'Sonia swims', effect: [ { friend: 0, health: -70 }, { friend: 1, morale: +40 }, { friend: 2, morale: +40 } ] }, { label: 'Ari swims', effect: [ { friend: 1, health: -70 }, { friend: 0, morale: +40 }, { friend: 2, morale: +40 } ] }, { label: 'Stefi swims', effect: [ { friend: 2, health: -70 }, { friend: 0, morale: +40 }, { friend: 1, morale: +40 } ] } ] },
  { desc: 'A wild animal blocks the path. Who will distract it? (Chosen: -60 health, others: +30 morale)', choices: [ { label: 'Sonia distracts', effect: [ { friend: 0, health: -60 }, { friend: 1, morale: +30 }, { friend: 2, morale: +30 } ] }, { label: 'Ari distracts', effect: [ { friend: 1, health: -60 }, { friend: 0, morale: +30 }, { friend: 2, morale: +30 } ] }, { label: 'Stefi distracts', effect: [ { friend: 2, health: -60 }, { friend: 0, morale: +30 }, { friend: 1, morale: +30 } ] } ] },
  { desc: 'You find a cave. It may be dangerous. Who explores? (Chosen: -50 health, others: +20 morale)', choices: [ { label: 'Sonia explores', effect: [ { friend: 0, health: -50 }, { friend: 1, morale: +20 }, { friend: 2, morale: +20 } ] }, { label: 'Ari explores', effect: [ { friend: 1, health: -50 }, { friend: 0, morale: +20 }, { friend: 2, morale: +20 } ] }, { label: 'Stefi explores', effect: [ { friend: 2, health: -50 }, { friend: 0, morale: +20 }, { friend: 1, morale: +20 } ] } ] },
  { desc: 'A friend is accused of stealing food. Who do you trust? (Accused: -60 morale, others: +20 health)', choices: [ { label: 'Trust Sonia', effect: [ { friend: 0, morale: -60 }, { friend: 1, health: +20 }, { friend: 2, health: +20 } ] }, { label: 'Trust Ari', effect: [ { friend: 1, morale: -60 }, { friend: 0, health: +20 }, { friend: 2, health: +20 } ] }, { label: 'Trust Stefi', effect: [ { friend: 2, morale: -60 }, { friend: 0, health: +20 }, { friend: 1, health: +20 } ] } ] },
  { desc: 'You find a boat. Only one can escape. Who do you choose? (Chosen: +100 health, others: -100 morale)', choices: [ { label: 'Choose Sonia', effect: [ { friend: 0, health: +100 }, { friend: 1, morale: -100 }, { friend: 2, morale: -100 } ] }, { label: 'Choose Ari', effect: [ { friend: 1, health: +100 }, { friend: 0, morale: -100 }, { friend: 2, morale: -100 } ] }, { label: 'Choose Stefi', effect: [ { friend: 2, health: +100 }, { friend: 0, morale: -100 }, { friend: 1, morale: -100 } ] } ] },
  { desc: 'A friend confesses a secret. Who do you forgive? (Forgiven: +40 morale, others: -20 health)', choices: [ { label: 'Forgive Sonia', effect: [ { friend: 0, morale: +40 }, { friend: 1, health: -20 }, { friend: 2, health: -20 } ] }, { label: 'Forgive Ari', effect: [ { friend: 1, morale: +40 }, { friend: 0, health: -20 }, { friend: 2, health: -20 } ] }, { label: 'Forgive Stefi', effect: [ { friend: 2, morale: +40 }, { friend: 0, health: -20 }, { friend: 1, health: -20 } ] } ] }
];

let currentTask = 0;

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

function startGame() {
  friends.forEach(f => { f.health = 100; f.morale = 100; });
  currentTask = 0;
  showTask();
  showScreen('game');
}

function showTask() {
  document.getElementById('task-number').textContent = currentTask + 1;
  document.getElementById('task-desc').textContent = tasks[currentTask].desc;
  drawFriends();
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  tasks[currentTask].choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.textContent = choice.label;
    btn.onclick = () => makeChoice(idx);
    choicesDiv.appendChild(btn);
  });
}

function drawFriends() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw forest background
  ctx.fillStyle = '#2e7d32';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw trees
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = '#1b5e20';
    ctx.fillRect(60 + i * 70, 60, 20, 120);
    ctx.beginPath();
    ctx.arc(70 + i * 70, 60, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#388e3c';
    ctx.fill();
  }
  // Draw friends
  friends.forEach((f, i) => {
    const x = 120 + i * 180;
    const y = 200;
    // Draw body
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, 2 * Math.PI);
    ctx.fillStyle = f.color;
    ctx.fill();
    // Draw hair
    ctx.beginPath();
    if (f.name === 'Sonia') {
      ctx.arc(x, y - 30, 28, Math.PI, 2 * Math.PI);
      ctx.fillStyle = '#d35400'; // ginger
      ctx.fill();
    } else if (f.name === 'Ari') {
      ctx.arc(x, y - 30, 28, Math.PI, 2 * Math.PI);
      ctx.fillStyle = '#f9e79f'; // blonde
      ctx.fill();
    } else if (f.name === 'Stefi') {
      ctx.arc(x, y - 30, 28, Math.PI, 2 * Math.PI);
      ctx.fillStyle = '#4e342e'; // brunette
      ctx.fill();
    }
    // Draw face (eyes and mouth)
    // Eyes
    ctx.beginPath();
    ctx.arc(x - 15, y - 10, 5, 0, 2 * Math.PI);
    ctx.arc(x + 15, y - 10, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x - 15, y - 10, 2, 0, 2 * Math.PI);
    ctx.arc(x + 15, y - 10, 2, 0, 2 * Math.PI);
    ctx.fillStyle = '#222';
    ctx.fill();
    // Mouth
    ctx.beginPath();
    ctx.arc(x, y + 10, 12, Math.PI * 0.1, Math.PI * 0.9);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fff';
    ctx.stroke();
    ctx.lineWidth = 1;
    // Draw name
    ctx.fillStyle = '#fff';
    ctx.font = '20px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText(f.name, x, y - 55);
    // Draw health bar
    ctx.fillStyle = '#27ae60';
    ctx.fillRect(x - 40, y + 50, Math.max(0, f.health) * 0.8, 10);
    ctx.fillStyle = '#fff';
    ctx.font = '14px Segoe UI';
    ctx.fillText('Health: ' + f.health, x, y + 70);
    // Draw morale bar
    ctx.fillStyle = '#8e44ad';
    ctx.fillRect(x - 40, y + 85, Math.max(0, f.morale) * 0.8, 10);
    ctx.fillStyle = '#fff';
    ctx.fillText('Morale: ' + f.morale, x, y + 105);
  });
}

function makeChoice(choiceIdx) {
  const effects = tasks[currentTask].choices[choiceIdx].effect;
  effects.forEach(e => {
    if (e.health) friends[e.friend].health += e.health;
    if (e.morale) friends[e.friend].morale += e.morale;
  });
  currentTask++;
  if (friends.some(f => f.health <= 0 || f.morale <= 0)) {
    endGame('One of your friends could not endure the journey. You lose.');
    return;
  }
  if (currentTask < tasks.length) {
    showTask();
  } else {
    endGame('The journey is over. Your choices shaped their fate.');
  }
}

function endGame(ending) {
  let result = '';
  friends.forEach(f => {
    let future = '';
    if (f.health > 80 && f.morale > 80) {
      future = `${f.name} thrives after the journey, becoming a leader and inspiring others.`;
    } else if (f.health > 50 && f.morale > 50) {
      future = `${f.name} survives, but is forever changed by the hardships.`;
    } else if (f.health > 0 && f.morale > 0) {
      future = `${f.name} struggles to recover, haunted by the sacrifices made.`;
    } else {
      future = `${f.name} did not survive the journey.`;
    }
    result += future + '\n';
  });
  document.getElementById('ending-text').textContent = ending + '\n\n' + result;
  showScreen('end');
  // Show jumpscare video after 3 seconds
  setTimeout(() => {
    document.getElementById('jumpscare-video-overlay').style.display = 'flex';
    const jumpscareVideo = document.getElementById('jumpscare-video');
    jumpscareVideo.currentTime = 0;
    jumpscareVideo.play();
    // Hide overlay after video ends
    jumpscareVideo.onended = () => {
      document.getElementById('jumpscare-video-overlay').style.display = 'none';
    };
  }, 3000);
}

function restartGame() {
  showScreen('menu');
}

window.onload = function() {
  document.getElementById('start-btn').onclick = startGame;
  document.getElementById('restart-btn').onclick = restartGame;
  showScreen('menu');
};
