document.getElementById('wishButton').addEventListener('click', function() {
    let message = document.querySelector('.message');
    message.style.opacity = 1;
    message.style.transform = "scale(1)";
    
    // Bật nhạc nền
    let audio = document.getElementById('background-music');
    audio.play().catch(error => console.log("Tự động phát nhạc bị chặn bởi trình duyệt!"));

    // Hiệu ứng pháo hoa
    startFireworks();
});

// Hiệu ứng pháo hoa
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function Particle(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 3 + 2;
    this.velocity = {
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 6
    };
    this.alpha = 1;
}

Particle.prototype.draw = function() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
}

Particle.prototype.update = function() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.02;
}

function createFirework(x, y) {
    const colors = ["#ff0000", "#ffff00", "#00ff00", "#0000ff", "#ff00ff"];
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
    }
}

function startFireworks() {
    setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        createFirework(x, y);
    }, 500);
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, i) => {
        if (particle.alpha <= 0) {
            particles.splice(i, 1);
        } else {
            particle.update();
            particle.draw();
        }
    });
}
animate();
