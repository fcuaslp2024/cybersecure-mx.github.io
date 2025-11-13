// matrix-effect.js - Efecto Matrix para el header
class MatrixEffect {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.drops = [];
        this.characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@*';
        this.fontSize = 14;
        this.columns = 0;
        this.animationId = null;
        this.isActive = false;
        
        this.init();
        this.setupEventListeners();
    }

    init() {
        this.resize();
        // Inicializar las gotas
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100; // Comenzar en diferentes posiciones
        }
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = new Array(this.columns).fill(-100);
    }

    setupEventListeners() {
        // Redimensionar cuando cambie el tamaño de la ventana
        window.addEventListener('resize', () => {
            this.resize();
        });

        // Efecto al hacer hover en el header
        const header = document.getElementById('matrix-header');
        header.addEventListener('mouseenter', () => {
            this.start();
        });

        header.addEventListener('mouseleave', () => {
            this.stop();
        });

        // También activar con hover en el menú
        const menu = document.querySelector('.menu');
        if (menu) {
            menu.addEventListener('mouseenter', () => {
                this.start();
            });
        }
    }

    draw() {
        // Fondo semitransparente para efecto de estela (más suave)
        this.ctx.fillStyle = 'rgba(26, 26, 46, 0.03)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Color del texto en tonos púrpura para combinar con tu tema
        this.ctx.fillStyle = '#9A3BEE'; // Usando tu color --accent
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            // Carácter aleatorio
            const text = this.characters.charAt(
                Math.floor(Math.random() * this.characters.length)
            );

            // Coordenadas x, y
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            // Dibujar el carácter
            this.ctx.fillText(text, x, y);

            // Reiniciar la gota cuando llega al fondo
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            // Mover la gota hacia abajo
            this.drops[i]++;
        }
    }

    animate() {
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    start() {
        if (!this.isActive) {
            this.isActive = true;
            this.canvas.classList.add('active');
            this.animate();
        }
    }

    stop() {
        if (this.isActive) {
            this.isActive = false;
            this.canvas.classList.remove('active');
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
            
            // Limpiar el canvas gradualmente
            const fadeOut = () => {
                this.ctx.fillStyle = 'rgba(26, 26, 46, 0.1)';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            };
            fadeOut();
        }
    }
}

// Inicializar el efecto cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const matrix = new MatrixEffect(canvas);
    }
});