
    // Profile image upload functionality
    document.querySelector("#uploadicon").addEventListener("click", function() {
        document.querySelector("#uploadform input").click();
    });

    document.querySelector("#uploadform input").addEventListener("change", function() {
        if (this.files && this.files[0]) {
            // Show loading state
            const profileImg = document.querySelector(".profile-image img");
            const originalSrc = profileImg.src;
            
            // Optional: Show upload progress
            profileImg.style.opacity = "0.7";
            
            // Submit the form
            document.querySelector("#uploadform").submit();
        }
    });

    // Mobile menu toggle functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.style.maxHeight = '0px';
                mobileMenu.style.transition = 'max-height 0.3s ease-in-out';
                setTimeout(() => {
                    mobileMenu.style.maxHeight = '200px';
                }, 10);
                
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            } else {
                mobileMenu.style.maxHeight = '0px';
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
                
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        });
    }
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Enhanced user experience for profile interactions
    const profileImage = document.querySelector('.profile-image');
    const uploadIcon = document.querySelector('#uploadicon');
    
    // Add hover effect for better UX
    profileImage.addEventListener('mouseenter', () => {
        uploadIcon.style.transform = 'scale(1.1)';
        uploadIcon.style.background = 'rgba(244, 244, 245, 1)';
    });
    
    profileImage.addEventListener('mouseleave', () => {
        uploadIcon.style.transform = 'scale(1)';
        uploadIcon.style.background = 'rgba(244, 244, 245, 0.95)';
    });

    // Add loading animation for better feedback
    const addPostBtn = document.querySelector('.add-post-btn');
    addPostBtn.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
