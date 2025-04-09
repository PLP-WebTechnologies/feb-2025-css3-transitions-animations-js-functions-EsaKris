document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#4361ee" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { 
                    enable: true, 
                    distance: 150, 
                    color: "#4361ee", 
                    opacity: 0.4, 
                    width: 1 
                },
                move: { 
                    enable: true, 
                    speed: 2, 
                    direction: "none", 
                    random: true, 
                    straight: false, 
                    out_mode: "out" 
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // DOM Elements
    const saveBtn = document.getElementById('saveBtn');
    const resetBtn = document.getElementById('resetBtn');
    const animateBtn = document.getElementById('animateBtn');
    const usernameInput = document.getElementById('username');
    const themeSelect = document.getElementById('theme');
    const animatedElement = document.getElementById('animatedElement');
    const animationRadios = document.querySelectorAll('input[name="animation"]');
    const body = document.body;
    
    // Current animation state
    let isAnimating = false;
    let currentAnimation = 'float';
    
    // Load saved preferences when page loads
    loadPreferences();
    
    // Save preferences to localStorage
    saveBtn.addEventListener('click', function() {
        const preferences = {
            username: usernameInput.value,
            theme: themeSelect.value
        };
        
        // Store preferences
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        
        // Show save confirmation
        showConfirmation('Preferences Saved!', 'success');
        
        // Apply theme immediately
        applyTheme(preferences.theme);
        
        // Add visual feedback
        this.classList.add('pulse');
        setTimeout(() => {
            this.classList.remove('pulse');
        }, 1000);
    });
    
    // Reset preferences
    resetBtn.addEventListener('click', function() {
        // Clear saved preferences
        localStorage.removeItem('userPreferences');
        
        // Reset form fields
        usernameInput.value = '';
        themeSelect.value = '';
        
        // Apply default theme
        applyTheme('light');
        
        // Show reset confirmation
        showConfirmation('Preferences Reset!', 'info');
        
        // Add visual feedback
        this.classList.add('rotate');
        setTimeout(() => {
            this.classList.remove('rotate');
        }, 1000);
        
        // If animation is running, stop it
        if (isAnimating) {
            stopAnimation();
            updateAnimationButton();
        }
    });
    
    // Toggle animation
    animateBtn.addEventListener('click', function() {
        if (isAnimating) {
            stopAnimation();
        } else {
            startAnimation();
        }
        updateAnimationButton();
    });
    
    // Change animation type
    animationRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            currentAnimation = this.value;
            if (isAnimating) {
                // If animation is running, restart with new type
                stopAnimation();
                startAnimation();
            }
        });
    });
    
    // Click on animated box for special effect
    animatedElement.addEventListener('click', function(event) {
        // Pulse effect
        this.classList.add('pulse');
        setTimeout(() => {
            this.classList.remove('pulse');
        }, 1000);
        
        // Create particle burst effect
        createParticleBurst(event.clientX, event.clientY);
    });
    
    // Function to load preferences from localStorage
    function loadPreferences() {
        const savedPreferences = localStorage.getItem('userPreferences');
        if (savedPreferences) {
            const preferences = JSON.parse(savedPreferences);
            
            // Set form values
            usernameInput.value = preferences.username || '';
            themeSelect.value = preferences.theme || 'light';
            
            // Apply theme
            applyTheme(preferences.theme);
        }
    }
    
    // Function to apply selected theme
    function applyTheme(theme) {
        // Remove all theme classes first
        body.classList.remove('light-theme', 'dark-theme', 'neon-theme', 'sunset-theme');
        
        // Add the selected theme class
        if (theme) {
            body.classList.add(`${theme}-theme`);
            updateParticlesColor(theme);
        } else {
            body.classList.add('light-theme');
            updateParticlesColor('light');
        }
    }
    
    // Function to update particles.js colors based on theme
    function updateParticlesColor(theme) {
        if (typeof window.pJSDom === 'undefined' || window.pJSDom.length === 0) return;
        
        const pJS = window.pJSDom[0].pJS;
        let particleColor, lineColor;
        
        switch(theme) {
            case 'dark':
                particleColor = "#f8f9fa";
                lineColor = "#f8f9fa";
                break;
            case 'neon':
                particleColor = "#08f7fe";
                lineColor = "#08f7fe";
                break;
            case 'sunset':
                particleColor = "#ff6b6b";
                lineColor = "#ff6b6b";
                break;
            default: // light theme
                particleColor = "#4361ee";
                lineColor = "#4361ee";
        }
        
        pJS.particles.color.value = particleColor;
        pJS.particles.line_linked.color = lineColor;
        pJS.fn.particlesRefresh();
    }
    
    // Function to start animation
    function startAnimation() {
        if (!currentAnimation) return;
        
        // Reset all styles first
        animatedElement.style.clipPath = '';
        animatedElement.style.borderRadius = '';
        animatedElement.style.background = '';
        
        // Apply specific shape and animation
        switch(currentAnimation) {
            case 'float':
                animatedElement.classList.add('float-animation');
                break;
            case 'spin':
                animatedElement.classList.add('spin-animation');
                break;
            case 'wave':
                animatedElement.classList.add('wave-animation');
                break;
            case 'pulse':
                animatedElement.classList.add('pulse-animation');
                break;
            case 'swirl':
                animatedElement.classList.add('swirl-animation');
                break;
        }
        
        isAnimating = true;
    }
    
    // Function to stop animation
    function stopAnimation() {
        // Remove all animation classes
        animatedElement.classList.remove(
            'float-animation', 
            'spin-animation', 
            'wave-animation',
            'pulse-animation',
            'swirl-animation'
        );
        
        // Reset styles
        animatedElement.style.clipPath = '';
        animatedElement.style.borderRadius = '';
        animatedElement.style.background = 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)';
        
        isAnimating = false;
    }
    
    // Function to update animation button state
    function updateAnimationButton() {
        const btnContent = animateBtn.querySelector('.btn-content');
        const btnIcon = animateBtn.querySelector('.btn-icon i');
        
        if (isAnimating) {
            btnContent.textContent = 'Stop Animation';
            btnIcon.classList.replace('fa-play', 'fa-stop');
            animateBtn.classList.add('btn-active');
        } else {
            btnContent.textContent = 'Start Animation';
            btnIcon.classList.replace('fa-stop', 'fa-play');
            animateBtn.classList.remove('btn-active');
        }
    }
    
    // Function to show confirmation message
    function showConfirmation(message, type) {
        const colors = {
            success: '#4cc9f0',
            info: '#43aa8b',
            warning: '#f8961e',
            error: '#f72585'
        };
        
        const confirmation = document.createElement('div');
        confirmation.className = `confirmation-message ${type}-message`;
        confirmation.textContent = message;
        confirmation.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(confirmation);
        
        // Trigger reflow to enable animation
        void confirmation.offsetWidth;
        
        confirmation.style.opacity = '1';
        confirmation.style.transform = 'translate(-50%, 0)';
        
        // Remove after animation
        setTimeout(() => {
            confirmation.style.opacity = '0';
            confirmation.style.transform = 'translate(-50%, -20px)';
            setTimeout(() => {
                confirmation.remove();
            }, 500);
        }, 3000);
    }
    
    // Function to create particle burst effect
    function createParticleBurst(x, y) {
        const particles = [];
        const colors = getThemeColors();
        
        // Create 12 particles
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 4px and 8px
            const size = Math.random() * 4 + 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random color from theme
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Position at click location
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            document.body.appendChild(particle);
            particles.push(particle);
            
            // Animate particle
            animateParticle(particle);
        }
        
        // Remove particles after animation
        setTimeout(() => {
            particles.forEach(particle => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            });
        }, 1000);
    }
    
    // Function to animate individual particle
    function animateParticle(particle) {
        // Random direction and distance
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        // Random duration between 0.5s and 1s
        const duration = Math.random() * 500 + 500;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1 
            },
            { 
                transform: `translate(${x}px, ${y}px) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
        });
    }
    
    // Function to get colors based on current theme
    function getThemeColors() {
        const theme = themeSelect.value || 'light';
        
        switch(theme) {
            case 'dark':
                return ['#f8f9fa', '#adb5bd', '#dee2e6'];
            case 'neon':
                return ['#08f7fe', '#09fbd3', '#fe53bb'];
            case 'sunset':
                return ['#ff7e5f', '#feb47b', '#ff6b6b'];
            default: // light theme
                return ['#4361ee', '#3f37c9', '#4895ef'];
        }
    }
});
