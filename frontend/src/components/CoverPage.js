import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CoverPage() {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };

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

    return (
        <div style={styles.coverPage}>
            <canvas id="techBackground" style={styles.canvas}></canvas>
            <div style={styles.container}>
                <h1>Welcome to the Signature Verification System</h1>
                <p>
                    This project is a signature verification system using deep learning. It helps you identify whether a signature is genuine or forged.
                    Click the button below to start the verification process.
                </p>
                <div className="image-container">
                    <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCENNhXloBIMRVc_EkERRZKRKKcXuIO7mYw&s" 
                        alt="Sample Signature" 
                        className="sample-image" 
                        style={styles.image}
                    />
                </div>
                <button onClick={goToLogin} style={styles.button}>Get Started</button>
            </div>
        </div>
    );
}

const styles = {
    coverPage: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#1a1a1a', // Dark background color
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden', // Prevent scrolling
    },
    canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0, // Ensure the canvas is behind the content
        width: '100%',
        height: '100%',
    },
    container: {
        textAlign: 'center',
        padding: '40px',
        width: '80%',
        maxWidth: '600px',
        borderRadius: '12px',
        zIndex: 10,
    },
    button: {
        padding: '15px 30px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1em',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginTop: '30px', // Added margin to create a gap
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    imageContainer: {
        marginTop: '20px',
    },
    image: {
        width: '100%',
        maxWidth: '500px', // Increase the image size for clarity
        height: 'auto',
        marginTop: '20px',
        borderRadius: '8px',
    },
};

export default CoverPage;
