
        // Add form validation and enhanced UX
        const form = document.querySelector('form');
        const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
        
        inputs.forEach(input => {
            // Focus effects
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'scale(1.02)';
                input.parentElement.style.transition = 'transform 0.2s ease';
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.style.transform = 'scale(1)';
            });
            
            // Real-time validation feedback
            input.addEventListener('input', () => {
                if (input.value.length > 0) {
                    input.classList.add('border-green-500/50');
                    input.classList.remove('border-zinc-600/50');
                } else {
                    input.classList.remove('border-green-500/50');
                    input.classList.add('border-zinc-600/50');
                }
            });
        });
        
        // Form submission enhancement
        form.addEventListener('submit', (e) => {
            const button = form.querySelector('button[type="submit"]');
            button.innerHTML = 'Creating Account...';
            button.disabled = true;
            
            // Re-enable after 3 seconds (remove in production)
            setTimeout(() => {
                button.innerHTML = 'Create Account';
                button.disabled = false;
            }, 3000);
        });
        
        // Add smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
