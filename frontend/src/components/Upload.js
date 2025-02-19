import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

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
  uploadBox: {
    width: '90%', // Make it responsive by using percentage width
    maxWidth: '440px', // Ensure it doesn't exceed the max width
    background: 'transparent',
    border: '2px solid rgba(255, 255, 255, .2)',
    backdropFilter: 'blur(9px)',
    color: '#fff',
    borderRadius: '12px',
    padding: '30px 40px',
    position: 'absolute',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  title: {
    fontSize: '36px',
    color: '#fff',
    marginBottom: '20px',
    textAlign: 'center',
    wordWrap: 'break-word',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  input: {
    width: '100%',
    height: '25px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '40px',
    fontSize: '16px',
    color: '#fff',
    padding: '10px 20px',
    outline: 'none',
    textAlign: 'center',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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


  useEffect(() => {
    initParticles();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
            const response = await axios.post('http://127.0.0.1:5000/verify', formData);
            const { result } = response.data;
            navigate(`/result/${result}`);
        } catch (err) {
            console.error(err);
        }
  };

  const initParticles = () => {
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

        this.x += this.directionX * 0.5;
        this.y += this.directionY * 0.5;

        this.draw();
      }
    }

    function init() {
      particlesArray.length = 0;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 4 + 1.5;
        let x = Math.random() * (canvas.width - size * 2) + size;
        let y = Math.random() * (canvas.height - size * 2) + size;
        let directionX = Math.random() * 2 - 1;
        let directionY = Math.random() * 2 - 1;
        let color = '#ff3333';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesArray.forEach((particle) => {
        particle.update();
      });

      connectParticles();
    }

    function connectParticles() {
      particlesArray.forEach((particleA, index) => {
        for (let b = index + 1; b < particlesArray.length; b++) {
          const particleB = particlesArray[b];
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = 'rgba(66, 218, 245)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(particleB.x, particleB.y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      });
    }

    window.addEventListener('mousemove', (event) => {
      let mouseX = event.x;
      let mouseY = event.y;

      particlesArray.forEach((particle) => {
        let dx = mouseX - particle.x;
        let dy = mouseY - particle.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
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
  };

  return (
    <div style={styles.container}>
      <canvas id="techBackground"></canvas>
      <div style={styles.uploadBox}>
        <h2 style={styles.title}>Upload Signature</h2>
        <form onSubmit={handleUpload} style={styles.form}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
