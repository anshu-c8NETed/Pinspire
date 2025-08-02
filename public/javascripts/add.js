
        // Mobile menu toggle functionality
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.querySelector('.menu-icon');
        const closeIcon = document.querySelector('.close-icon');
        
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
        
        // Add smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Add form validation and enhanced UX
        const form = document.querySelector('form');
        const inputs = form.querySelectorAll('input[type="text"], textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'scale(1.02)';
                input.parentElement.style.transition = 'transform 0.2s ease';
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.style.transform = 'scale(1)';
            });
        });
