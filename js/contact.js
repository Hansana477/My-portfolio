document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");

    if (!contactForm) {
        return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const alertElement = document.createElement("div");
    alertElement.className = "form-alert";
    alertElement.setAttribute("aria-live", "polite");
    contactForm.prepend(alertElement);

    const showAlert = (message, type) => {
        alertElement.textContent = message;
        alertElement.className = `form-alert visible ${type}`;

        window.setTimeout(() => {
            alertElement.classList.remove("visible");
        }, 5000);
    };

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        alertElement.className = "form-alert";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                let message = "Message submission failed.";

                try {
                    const errorPayload = await response.json();
                    message = errorPayload.error || message;
                } catch (parseError) {
                    message = "Message submission failed. Please try again.";
                }

                throw new Error(message);
            }

            contactForm.reset();
            showAlert("Message sent successfully. I'll get back to you soon.", "success");
        } catch (error) {
            console.error("Form error:", error);
            showAlert("Unable to send your message right now. Please try again or email me directly.", "error");
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
    });
});
