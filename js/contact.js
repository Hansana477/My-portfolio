document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Create alert element
    const alertEl = document.createElement('div');
    alertEl.className = 'form-alert';
    contactForm.prepend(alertEl);
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        alertEl.classList.remove('visible', 'success', 'error');
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                contactForm.reset();
                showAlert('Message sent successfully! I\'ll get back to you soon.', 'success');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Form submission failed');
            }
        } catch (error) {
            console.error('Form error:', error);
            showAlert('Failed to send message. Please try again or email me directly.', 'error');
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
    });
    
    function showAlert(message, type) {
        alertEl.textContent = message;
        alertEl.className = `form-alert visible ${type}`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            alertEl.classList.remove('visible');
        }, 5000);
    }
});