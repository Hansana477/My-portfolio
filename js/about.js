document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (reuse from main script)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.innerHTML = nav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateOnScroll() {
        timelineItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }
        });
    }
    
    // Set initial state
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transition = 'all 0.5s ease';
        
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
    });
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Animate hobby cards
    const hobbyCards = document.querySelectorAll('.hobby-card');
    
    hobbyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (cardPosition < screenPosition) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
    
    window.addEventListener('scroll', function() {
        hobbyCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });
});