gsap.set(".ball", {
	y: 240,
	x: -300,
	duration: 2
});

gsap.set(".obs", {
	y: 400,
	x: 100
});

gsap.set(".land", {
	y: 100
});

let treeCount = [0, 1, 2, 3, 4];



function generateRand() {
	let seed = Math.random();
	let newSeed = Math.floor(seed * 4); // Generate a random index between 0 and 4
	console.log('generateRand', newSeed + 1);
	return newSeed + 1;
}

let land = document.querySelector('.land');
let obstacle = document.createElement('div');
let subobstacle = document.createElement('div');
subobstacle.id='colli'
obstacle.className = "obs";
land.insertAdjacentElement("beforebegin", obstacle); // Use insertAdjacentElement() instead of before()

function createObstacle1(seed) {
	console.log('received seed', seed);

	subobstacle.style.gridTemplateColumns = `repeat(${treeCount[seed]}, 1fr)`;
	subobstacle.innerHTML = ""; // Clear the existing imgOps elements

	for (let index = 1; index <= treeCount[seed]; index++) {
		const imgOps = document.createElement('img');
		imgOps.src = "./4x/Asset 3@josh.png";
		subobstacle.appendChild(imgOps);
	}

	subobstacle.remove(); // Clear the existing subobstacle elements
	obstacle.appendChild(subobstacle); // Append the updated subobstacle to the obstacle element
}

setInterval(() => {
	createObstacle1(generateRand());
}, 2000);

let actionKey = window.addEventListener('keypress', (e) => {
	if (e.key === " ") { // Use strict equality operator (===) to compare the key
		gsap.fromTo(".ball", {
			y: 240,
			height: 60,
			opacity: 1
		}, {
			y: -100,
			height: 55,
			duration: 0.3,
			repeat: 1,
			yoyo: true
		});
	}
});

const SCORE = document.querySelector('.board');
let BSTSCORE = document.querySelector('.board2');
const SCORE2 = document.querySelector('.score');
let div1 = document.querySelector(".ball");
let div2 = document.getElementById('colli');
let notif = document.querySelector('.notific');
let score = 0;
let speed = 1.5;
console.log(div2);
BSTSCORE.innerHTML = localStorage.getItem("bestscore")

function updateSpeed() {
	if (score % 100 == 0) {
		speed -= 0.1; // Decrease speed by 0.1 for every 100 points (adjust factor as needed)
		gsap.to(".obs", {
			duration: speed // Update animation duration with new speed
		});
	}
}

function divCollision() {
	updateSpeed()
	SCORE.textContent = score;
	SCORE2.textContent = score;
	score++
	let ballRect = div1.getBoundingClientRect();
	let obstacleRect = subobstacle.getBoundingClientRect();
	console.log("obs top: %s,obs bottom: %s,obs left: %s,obs right: %s",
		obstacleRect.top,
		obstacleRect.bottom,
		obstacleRect.left,
		obstacleRect.right
	);
	console.log("balls top: %s,balls bottom: %s,balls left: %s,balls right: %s",
		ballRect.top,
		ballRect.bottom,
		ballRect.left,
		ballRect.right
	);

	if (
		(ballRect.top < obstacleRect.bottom && ballRect.bottom > obstacleRect.top)
		&&
		(ballRect.right > obstacleRect.left && ballRect.left < obstacleRect.right)
	) {
		tween.pause();
		console.log("Collision detected!");
		//console.log(typeof ());
		if (score > parseInt(localStorage.getItem("bestscore"))){
			localStorage.setItem("bestscore", score-1)
			console.log(true);
		}else{
			BSTSCORE.innerHTML = localStorage.getItem("bestscore")
			console.log(false);
		}
		
		
		clearInterval(checker);
		notif.style.display = 'grid';
	} else {
		notif.style.display = 'none';
		console.log("no Collision!");
	}
}

let tween = gsap.to(".obs", {
	x: -1500,
	opacity: 1,
	duration: speed, // Use updated speed
	repeat: -1,
	ease: "linear"
});

let checker = setInterval(divCollision, 100);

let restartBtn = document.querySelector('button');
restartBtn.onclick = () => {
	location.reload();
};
