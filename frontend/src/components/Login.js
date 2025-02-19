import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Define the correct credentials
    const correctUsername = 'vyshnavi'; // Replace with your username
    const correctPassword = 'vyshu123'; // Replace with your password

    // Check if the entered credentials match the correct ones
    if (username === correctUsername && password === correctPassword) {
      // Navigate to the upload page if credentials are correct
      navigate('/upload');
    } else {
      // Show error alert if credentials are incorrect
      alert('Invalid username or password');
    }
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
    <div style={styles.container}>
      <canvas id="techBackground"></canvas>
      <div style={styles.signinBox}>
        <h2 style={styles.title}>Sign In</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Password"
            required
          />
          
          {/* Remember Me checkbox */}
          <div style={styles.rememberMeContainer}>
            <label style={styles.rememberMeLabel}>
              <input type="checkbox" style={styles.checkbox} />
              Remember Me
            </label>
          </div>

          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  signinBox: {
    width: '440px',
    background: 'transparent',
    border: '2px solid rgba(255, 255, 255, .2)',
    backdropFilter: 'blur(9px)',
    color: '#fff',
    borderRadius: '12px',
    padding: '30px 40px',
    position: 'absolute',
    zIndex: 2,
  },
  title: {
    fontSize: '36px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
  },
  input: {
    height: '45px',
    background: 'transparent',
    border: '2px solid rgba(255, 255, 255, .2)',
    borderRadius: '40px',
    fontSize: '16px',
    color: '#fff',
    padding: '0 20px',
    outline: 'none',
  },
  button: {
    height: '45px',
    backgroundColor: '#007bff',
    borderRadius: '40px',
    fontSize: '16px',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  rememberMeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '15px', // Space between the checkbox and the button
  },
  rememberMeLabel: {
    fontSize: '18px',
    color: '#fff',
  },
  checkbox: {
    marginRight: '8px',
  },
};

export default Login;
