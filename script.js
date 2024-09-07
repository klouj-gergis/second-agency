document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Toggle mobile menu
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('change', function() {
        if (this.checked) {
            navLinks.style.transform = 'translateY(0)';
        } else {
            navLinks.style.transform = 'translateY(-100%)';
        }
    });

    // Form validation for contact page
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            if (name.value.trim() === '') {
                isValid = false;
                showError(name, 'Name is required');
            } else {
                removeError(name);
            }

            if (email.value.trim() === '') {
                isValid = false;
                showError(email, 'Email is required');
            } else if (!isValidEmail(email.value)) {
                isValid = false;
                showError(email, 'Please enter a valid email');
            } else {
                removeError(email);
            }

            if (subject.value.trim() === '') {
                isValid = false;
                showError(subject, 'Subject is required');
            } else {
                removeError(subject);
            }

            if (message.value.trim() === '') {
                isValid = false;
                showError(message, 'Message is required');
            } else {
                removeError(message);
            }

            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Form submitted successfully!');
                contactForm.reset();
            }
        });
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error-message') || document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(error);
        }
        input.classList.add('error');
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error-message');
        if (error) {
            formGroup.removeChild(error);
        }
        input.classList.remove('error');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Update copyright year
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        copyrightElement.textContent = `© ${currentYear} Your Name. All rights reserved.`;
    }

    // Handle form submission
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                formStatus.textContent = 'Thank you for your message. We\'ll get back to you soon!';
                formStatus.style.color = 'green';
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        }).catch(error => {
            formStatus.textContent = 'Oops! There was a problem submitting your form.';
            formStatus.style.color = 'red';
            console.error('Error:', error);
        });
    });
});
