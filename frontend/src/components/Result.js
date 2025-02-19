import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Result() {
    const { status } = useParams();

    useEffect(() => {
        // Initialize the particles animation
        const canvas = document.getElementById('techBackground');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particlesArray = [];
        const numberOfParticles = 120;

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }

            update() {
                if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                    this.directionY = -this.directionY;
                }

                this.x += this.directionX * 0.5; // Slower, smoother movement
                this.y += this.directionY * 0.5;

                this.draw();
            }
        }

        function init() {
            particlesArray.length = 0;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 4) + 1.5; // Slightly smaller particles
                let x = Math.random() * (canvas.width - size * 2) + size;
                let y = Math.random() * (canvas.height - size * 2) + size;
                let directionX = (Math.random() * 2) - 1;
                let directionY = (Math.random() * 2) - 1;
                let color = '#ff3333'; // color for particles

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesArray.forEach(particle => {
                particle.update();
            });

            connectParticles();
        }

        function connectParticles() {
            let opacityValue = 1;
            const minDistance = 50; // Minimum distance to avoid merging
            const maxDistance = (canvas.width / 7) * (canvas.height / 7); // Maximum distance for connecting

            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a + 1; b < particlesArray.length; b++) {
                    let dx = particlesArray[a].x - particlesArray[b].x;
                    let dy = particlesArray[a].y - particlesArray[b].y;
                    let distance = dx * dx + dy * dy;

                    if (distance > minDistance * minDistance && distance < maxDistance) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(66, 218, 245)`; // color for connections
                        ctx.lineWidth = 0.5; // Thinner lines for a refined look
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }

        window.addEventListener('mousemove', (event) => {
            let mouseX = event.x;
            let mouseY = event.y;

            particlesArray.forEach(particle => {
                let dx = mouseX - particle.x;
                let dy = mouseY - particle.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) { // Sensitive to mouse movements
                    particle.directionX = -dx / distance * 2;
                    particle.directionY = -dy / distance * 2;
                }
            });
        });

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });

        init();
        animate();
    }, []);

    const styles = {
        container: {
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#1a1a1a',
            fontFamily: 'Arial, sans-serif',
            position: 'relative',
            overflow: 'hidden',
        },
        canvas: {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            width: '100%',
            height: '100%',
        },
        box: {
            width: '90%',
            maxWidth: '440px',
            background: 'transparent',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(9px)',
            color: '#fff',
            borderRadius: '12px',
            padding: '30px 40px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
        },
        title: {
            fontSize: '36px',
            color: '#fff',
        },
        image: {
            width: '150px',
            height: '150px',
        },
        text: {
            fontSize: '20px',
            fontWeight: 'bold',
        },
        genuine: {
            color: '#4caf50',
        },
        forged: {
            color: '#f44336',
        },
        button: {
            width: '100%',
            height: '50px',
            backgroundColor: '#007bff',
            borderRadius: '40px',
            fontSize: '16px',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
        },
    };

    return (
        <div style={styles.container}>
            <canvas id="techBackground" style={styles.canvas}></canvas>
            <div style={styles.box}>
                <h2 style={styles.title}>Verification Result</h2>
                <img
                    src={
                        status === 'genuine'
                            ? 'https://cdn-icons-png.flaticon.com/512/148/148767.png'
                            : 'https://cdn-icons-png.flaticon.com/512/148/148766.png'
                    }
                    alt={status === 'genuine' ? 'Genuine' : 'Forged'}
                    style={styles.image}
                />
                <p
                    style={{
                        ...styles.text,
                        ...(status === 'genuine' ? styles.genuine : styles.forged),
                    }}
                >
                    The signature is {status === 'genuine' ? 'Genuine' : 'Forged'}.
                </p>
                <button onClick={() => (window.location.href = '/')} style={styles.button}>
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default Result;
