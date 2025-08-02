
        // Flash message functions
        function dismissFlash(elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                element.classList.add('flash-fadeout');
                setTimeout(() => {
                    element.remove();
                }, 500);
            }
        }
        
        // Auto-dismiss flash messages after 5 seconds
        function autoDismissFlashes() {
            const flashMessages = document.querySelectorAll('.flash-message');
            flashMessages.forEach((message, index) => {
                setTimeout(() => {
                    if (message && message.parentNode) {
                        message.classList.add('flash-fadeout');
                        setTimeout(() => {
                            if (message.parentNode) {
                                message.remove();
                            }
                        }, 500);
                    }
                }, 5000 + (index * 500)); // Stagger the auto-dismiss
            });
        }
        
        // Initialize auto-dismiss on page load
        document.addEventListener('DOMContentLoaded', autoDismissFlashes);
        
        // Form enhancement
        const form = document.querySelector('form');
        const inputs = form.querySelectorAll('input[type="text"], input[type="password"]');
        
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
            const button = document.getElementById('login-btn');
            const originalText = button.innerHTML;
            
            // Show loading state
            button.innerHTML = '<span class="flex items-center justify-center gap-2"><svg class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Signing in...</span>';
            button.disabled = true;
            button.classList.add('opacity-75', 'cursor-not-allowed');
            
            // Prevent multiple submissions
            form.style.pointerEvents = 'none';
        });
        
        // Add smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Shake animation for invalid form
        function shakeForm() {
            const formContainer = document.querySelector('.max-w-md');
            formContainer.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                formContainer.style.animation = '';
            }, 500);
        }
        
        // Add shake animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
        
        // Trigger shake animation if there's an error
        <% if(error && error.length > 0){ %>
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(shakeForm, 100);
            });
        <% } %>
