
    // Mobile menu toggle functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // You can implement mobile menu dropdown here
            console.log('Mobile menu clicked');
        });
    }
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Image loading optimization
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    // Add error handling for images
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/300x200/333333/666666?text=Image+Not+Found';
            this.alt = 'Image not found';
        });
        
        // Add loaded class for animations
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
    
    // Add card click functionality
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // You can add navigation to individual post pages here
            console.log('Card clicked:', this.querySelector('h5').textContent);
        });
    });
    
    // Masonry layout enhancement (if needed for better control)
    function optimizeMasonryLayout() {
        const container = document.querySelector('.cards');
        if (container) {
            // Force reflow to ensure proper masonry layout
            container.style.columnCount = getComputedStyle(container).columnCount;
        }
    }
    
    // Call on load and resize
    window.addEventListener('load', optimizeMasonryLayout);
    window.addEventListener('resize', optimizeMasonryLayout);
