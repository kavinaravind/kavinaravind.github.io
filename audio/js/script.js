var analyser, canvas, ctx, random = Math.random, circles = [];

window.onload = function() {
	canvas = document.createElement('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.getElementById('container').appendChild(canvas);
	//document.body.appendChild(canvas);
	ctx = canvas.getContext('2d');

	setupWebAudio();

	for (var i = 0; i < 20; i++) {
		circles[i] = new Circle();
		circles[i].draw();
	}
	draw();
};

function setupWebAudio() {
	var audio = document.createElement('audio');
	audio.crossOrigin = 'anonymous';
	audio.controls = true;
	audio.loop = false;
	audio.autoplay = false;
	audio.src = 'music.mp3';

	document.body.appendChild(audio);
	audio.style.width = window.innerWidth + 'px';

	var audioContext = new AudioContext();
	analyser = audioContext.createAnalyser();
	var source = audioContext.createMediaElementSource(audio);
	source.connect(analyser);
	analyser.connect(audioContext.destination);
	audio.play();
}

function draw() {
	requestAnimationFrame(draw);
	var freqByteData = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(freqByteData);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 1; i < circles.length; i ++) {
		circles[i].radius = freqByteData[i] * 2;
		circles[i].y = circles[i].y > canvas.height ? 0 : circles[i].y + 1;
		circles[i].draw();
	}

	for (var i = 1; i < freqByteData.length; i += 1) {
		ctx.fillStyle = 'rgb(' + getRandomColor() + ',' +  0 + ',' + getRandomColor() + ')';
		ctx.fillRect(i, canvas.height - freqByteData[i] * 3, 1, canvas.height);
		ctx.strokeRect(i, canvas.height - freqByteData[i] * 3, 1, canvas.height);
	}
}

function getRandomColor() {
	return random() * 255 >> 0;
} 

function Circle() {
	this.x = random() * canvas.width;
	this.y = random() * canvas.height;
	this.radius = random() * 100 + 50;
	this.color = 'rgb(' + getRandomColor() + ',' + 0 + ',' + getRandomColor() + ')';
}

Circle.prototype.draw = function() {
	var that = this;
	ctx.save();
	ctx.beginPath();
	ctx.globalAlpha = random() / 3 + 0.2;
	ctx.arc(that.x, that.y, that.radius, 0, Math.PI * 2);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.restore();
}