const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.innerHTML = nav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Header Scroll Effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
        
        // Typing Animation
        const typingText = document.querySelector('.typing-text');
        const professions = ['IT Student', 'Web Developer', 'Tech Enthusiast', 'Problem Solver'];
        let professionIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function type() {
            const currentProfession = professions[professionIndex];
            
            if (isDeleting) {
                typingText.textContent = currentProfession.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentProfession.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentProfession.length) {
                isEnd = true;
                isDeleting = true;
                setTimeout(type, 1500);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                professionIndex = (professionIndex + 1) % professions.length;
                setTimeout(type, 500);
            } else {
                const speed = isDeleting ? 100 : 150;
                setTimeout(type, speed);
            }
        }
        
        // Start typing animation
        setTimeout(type, 1000);
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
        });
        