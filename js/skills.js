document.addEventListener("DOMContentLoaded", function() {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll(".skill-progress");
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const barWidth = bar.style.width;
            bar.style.width = "0";
            
            setTimeout(() => {
                bar.style.width = barWidth;
            }, 100);
        });
    }
    
    // Run animation when skills section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(document.querySelector(".skills-categories"));
});