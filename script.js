// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Hero section fade out on scroll
    const hero = document.querySelector('.hero');
    const heroOverlay = document.querySelector('.hero-overlay');
    
    if (hero && heroOverlay) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const heroHeight = hero.offsetHeight;
            
            if (scrollPosition < heroHeight) {
                const opacity = 1 - (scrollPosition / (heroHeight * 0.8));
                heroOverlay.style.opacity = opacity > 0 ? opacity : 0;
            }
        });
    }
    
    // Testimonial carousel
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialTrack && testimonials.length && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        // Set initial position
        updateCarousel();
        
        // Previous button click
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1;
            updateCarousel();
        });
        
        // Next button click
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });
        
        // Auto slide every 5 seconds
        let autoSlide = setInterval(function() {
            currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);
        
        // Pause auto slide on hover
        testimonialTrack.addEventListener('mouseenter', function() {
            clearInterval(autoSlide);
        });
        
        // Resume auto slide on mouse leave
        testimonialTrack.addEventListener('mouseleave', function() {
            autoSlide = setInterval(function() {
                currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
                updateCarousel();
            }, 5000);
        });
        
        function updateCarousel() {
            testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }
    
    // Form submission
    const orderForm = document.getElementById('order-form');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const orderDetails = document.getElementById('order-details').value;
            
            // Simple validation
            if (!name || !email || !phone) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show success message
            alert(`Thank you ${name}! Your order has been received. We will contact you shortly at ${email} or ${phone} to confirm the details.`);
            
            // Reset form
            orderForm.reset();
        });
    }
    
    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    if (fadeElements.length) {
        checkFade();
        
        // Check on scroll
        window.addEventListener('scroll', checkFade);
    }
    
    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length && galleryItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});
