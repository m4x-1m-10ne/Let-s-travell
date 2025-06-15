document.addEventListener('DOMContentLoaded', function() {
    const premiumBanner = document.getElementById('premiumBanner');
    const closeBannerBtn = document.getElementById('closeBanner');
    
    if(!sessionStorage.getItem('premiumBannerClosed')) {
        setTimeout(() => {
            premiumBanner.classList.add('show');
        }, 3000);
    }
    
    closeBannerBtn.addEventListener('click', function() {
        premiumBanner.classList.remove('show');
        sessionStorage.setItem('premiumBannerClosed', 'true');
    });
    
    const scrollDownBtn = document.getElementById('scrollDownBtn');
    const footer = document.getElementById('footer');
    
    scrollDownBtn.addEventListener('click', function() {
        if (footer) {
            const footerPosition = footer.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = footerPosition - 150;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
    
    window.addEventListener('scroll', function() {
        if (!footer) return;
        
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (window.pageYOffset > 300 && footerRect.top > windowHeight * 0.7) {
            scrollDownBtn.classList.add('show');
        } else {
            scrollDownBtn.classList.remove('show');
        }
    });
    
    function checkScreenSize() {
        if(window.innerWidth < 992) {
            premiumBanner.style.display = 'none';
        } else {
            premiumBanner.style.display = 'block';
        }
    }
    
    const subscribeForm = document.querySelector('.footer-col-5 form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const subscriptionSection = document.querySelector('.footer-col-5');
            
            if (emailInput && emailInput.value && emailInput.value.includes('@')) {
                localStorage.setItem('subscribed', 'true');
                
                const oldMessages = this.parentNode.querySelectorAll('.text-success, .text-danger');
                oldMessages.forEach(msg => msg.remove());
                
                const message = document.createElement('p');
                message.className = 'text-success small mt-2';
                message.textContent = 'Вы подписаны на рассылку';
                this.parentNode.insertBefore(message, this.nextSibling);
                
                subscriptionSection.classList.add('highlight-subscription');
                
                setTimeout(() => {
                    message.remove();
                    subscriptionSection.classList.remove('highlight-subscription');
                }, 5000);
                
                emailInput.value = '';
                
                setTimeout(() => {
                    subscriptionSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 100);
            } else {
                const oldMessages = this.parentNode.querySelectorAll('.text-success, .text-danger');
                oldMessages.forEach(msg => msg.remove());
                
                const errorMessage = document.createElement('p');
                errorMessage.className = 'text-danger small mt-2';
                errorMessage.textContent = 'Пожалуйста, введите корректный email';
                this.parentNode.insertBefore(errorMessage, this.nextSibling);
                
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            }
        });
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
});

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === 'index.html' && linkPage === '/') ||
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});

function toggleArticle(card) {
    const content = card.querySelector('.article-content');
    const isCollapsed = content.classList.contains('collapse');
    
    document.querySelectorAll('.article-content').forEach(el => {
        if (el !== content) {
            el.classList.add('collapse');
        }
    });
    
    if (isCollapsed) {
        content.classList.remove('collapse');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        content.classList.add('collapse');
    }
}

function switchToRegister() {
    const registerTab = new bootstrap.Tab(document.getElementById('register-tab'));
    registerTab.show();
}

function switchToLogin() {
    const loginTab = new bootstrap.Tab(document.getElementById('login-tab'));
    loginTab.show();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Вход выполнен успешно!');
    });
    
    document.getElementById('registerForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Пароли не совпадают!');
            return;
        }
        
        alert('Регистрация прошла успешно! Теперь вы можете войти.');
        switchToLogin();
    });
});

const bannerSubscribeBtn = document.querySelector('.monetization-banner .btn-dark-custom');
if (bannerSubscribeBtn) {
    bannerSubscribeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const subscriptionSection = document.querySelector('.footer-col-5');
        
        premiumBanner.classList.remove('show');
        sessionStorage.setItem('premiumBannerClosed', 'true');
        
        setTimeout(() => {
            subscriptionSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            subscriptionSection.classList.add('highlight-subscription');
            
            setTimeout(() => {
                subscriptionSection.classList.remove('highlight-subscription');
            }, 2000);
            
            const emailInput = subscriptionSection.querySelector('input[type="email"]');
            if (emailInput) {
                emailInput.focus();
            }
        }, 100);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.flip-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const width = rect.width;
            
            const direction = x < width / 2 ? -180 : 180;
            
            this.querySelector('.flip-card-inner').style.transform = `rotateY(${direction}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.flip-card-inner').style.transform = 'rotateY(0deg)';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    function copyToClipboard(text, tooltip) {
        navigator.clipboard.writeText(text).then(function() {
            tooltip.classList.add('show');
            setTimeout(function() {
                tooltip.classList.remove('show');
            }, 2000);
        }).catch(function(err) {
            console.error('Ошибка копирования: ', err);
        });
    }

    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-clipboard-text');
            const tooltip = this.querySelector('.copy-tooltip');
            copyToClipboard(textToCopy, tooltip);
        });
    });

    if (!navigator.clipboard) {
        contactItems.forEach(item => {
            item.addEventListener('click', function() {
                const textToCopy = this.getAttribute('data-clipboard-text');
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    const tooltip = this.querySelector('.copy-tooltip');
                    tooltip.classList.add('show');
                    setTimeout(function() {
                        tooltip.classList.remove('show');
                    }, 2000);
                } catch (err) {
                    console.error('Ошибка копирования: ', err);
                }
                document.body.removeChild(textarea);
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const contactLink = document.querySelector('.contact-btn');
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            const footer = document.getElementById('footer');
            if (footer) {
                window.scrollTo({
                    top: footer.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    window.addEventListener('scroll', function() {
        const footer = document.getElementById('footer');
        const contactLink = document.querySelector('.contact-btn');
        
        if (footer && contactLink) {
            const footerTop = footer.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (footerTop < windowHeight * 0.7) {
                contactLink.classList.add('active');
            } else {
                contactLink.classList.remove('active');
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    function switchToTab(tabId) {
        const tabTrigger = document.getElementById(tabId + '-tab');
        if (tabTrigger) {
            const tab = new bootstrap.Tab(tabTrigger);
            tab.show();
        }
        
        const authSection = document.querySelector('.auth-section');
        if (authSection) {
            window.scrollTo({
                top: authSection.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    }

    const authButtons = document.querySelectorAll('.auth-nav-btn');
    authButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            switchToTab(tabId);
        });
    });

    if (window.location.hash === '#login' || window.location.hash === '#register') {
        const tabId = window.location.hash.substring(1);
        switchToTab(tabId);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const tourLinks = document.querySelectorAll('.tour-card-link');
    
    tourLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const tourId = this.getAttribute('href').split('#')[1];
            localStorage.setItem('scrollToTour', tourId);
        });
    });

    const scrollToTour = () => {
        const tourId = window.location.hash.substring(1) || localStorage.getItem('scrollToTour');
        if (!tourId) return;
        
        const element = document.getElementById(tourId);
        if (element) {
            setTimeout(() => {
                const elementRect = element.getBoundingClientRect();
                const absoluteElementTop = elementRect.top + window.pageYOffset;
                const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
                
                window.scrollTo({
                    top: middle,
                    behavior: 'smooth'
                });
                
                element.classList.add('highlight-tour');
                setTimeout(() => {
                    element.classList.remove('highlight-tour');
                }, 2000);
            }, 100);
        }
        localStorage.removeItem('scrollToTour');
    };

    scrollToTour();
    window.addEventListener('load', scrollToTour);
});

function handleSuccessfulAuth() {
    localStorage.setItem('isLoggedIn', 'true');
    const returnUrl = localStorage.getItem('returnAfterLogin') || 'index.html';
    localStorage.removeItem('returnAfterLogin');
    window.location.href = returnUrl;
}

function checkAuth() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function showLoginForm() {
    document.getElementById('authRequiredMessage').classList.add('d-none');
    document.getElementById('registerFormContainer').classList.add('d-none');
    document.getElementById('loginFormContainer').classList.remove('d-none');
}

function showRegisterForm() {
    document.getElementById('authRequiredMessage').classList.add('d-none');
    document.getElementById('loginFormContainer').classList.add('d-none');
    document.getElementById('registerFormContainer').classList.remove('d-none');
}

function hideAuthForms() {
    document.getElementById('loginFormContainer').classList.add('d-none');
    document.getElementById('registerFormContainer').classList.add('d-none');
    document.getElementById('authRequiredMessage').classList.remove('d-none');
}

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    document.getElementById('authRequiredMessage').classList.add('d-none');
    document.getElementById('loginFormContainer').classList.add('d-none');
    document.getElementById('personalInfoForm').classList.remove('d-none');
    document.getElementById('email').value = email;
});

document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
    }
    
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', document.getElementById('regEmail').value);
    document.getElementById('authRequiredMessage').classList.add('d-none');
    document.getElementById('registerFormContainer').classList.add('d-none');
    document.getElementById('personalInfoForm').classList.remove('d-none');
    document.getElementById('firstName').value = document.getElementById('regFirstName').value;
    document.getElementById('lastName').value = document.getElementById('regLastName').value;
    document.getElementById('email').value = document.getElementById('regEmail').value;
    document.getElementById('phone').value = document.getElementById('regPhone').value;
});

function nextStep(step) {
    if (step === 2) {
        if (!checkAuth()) {
            saveFormData();
            document.getElementById('authRequiredMessage').classList.remove('d-none');
            document.getElementById('loginFormContainer').classList.add('d-none');
            document.getElementById('registerFormContainer').classList.add('d-none');
            document.getElementById('personalInfoForm').classList.add('d-none');
            document.querySelectorAll('.form-section').forEach(section => {
                section.classList.add('d-none');
            });
            document.getElementById('personalInfoSection').classList.remove('d-none');
            updateStepIndicator(step);
            return;
        } else {
            document.getElementById('authRequiredMessage').classList.add('d-none');
            document.getElementById('personalInfoForm').classList.remove('d-none');
        }
    }
}

function saveFormData() {
    const formData = {
        tourSelect: document.getElementById('tourSelect').value,
        tourDate: document.getElementById('tourDate').value,
        participants: document.getElementById('participants').value,
        insurance: document.getElementById('insurance').checked
    };
    localStorage.setItem('orderFormData', JSON.stringify(formData));
}

function restoreFormData() {
    const savedData = localStorage.getItem('orderFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        document.getElementById('tourSelect').value = formData.tourSelect;
        document.getElementById('tourDate').value = formData.tourDate;
        document.getElementById('participants').value = formData.participants;
        document.getElementById('insurance').checked = formData.insurance;
        
        if (formData.tourSelect) {
            updateSelectedTour();
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    restoreFormData();
    if (checkAuth() && document.getElementById('personalInfoSection')) {
        document.getElementById('authRequiredMessage').classList.add('d-none');
        document.getElementById('personalInfoForm').classList.remove('d-none');
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            document.getElementById('email').value = userEmail;
        }
    }
});

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.reload();
}

function nextStep(step) {
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.add('d-none');
    });
    document.getElementById(getSectionId(step)).classList.remove('d-none');
    updateStepIndicator(step);
    if(step === 4) {
        updateConfirmationData();
    }
}

function prevStep(step) {
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.add('d-none');
    });
    document.getElementById(getSectionId(step)).classList.remove('d-none');
    updateStepIndicator(step, false);
}

function getSectionId(step) {
    switch(step) {
        case 1: return 'tourInfoSection';
        case 2: return 'personalInfoSection';
        case 3: return 'paymentSection';
        case 4: return 'confirmationSection';
        default: return 'tourInfoSection';
    }
}

function updateStepIndicator(step, isNext = true) {
    document.querySelectorAll('.step').forEach(stepEl => {
        stepEl.classList.remove('active', 'completed');
    });
    document.getElementById('step'+step).classList.add('active');
    if(isNext) {
        for(let i = 1; i < step; i++) {
            document.getElementById('step'+i).classList.add('completed');
        }
    } else {
        for(let i = 1; i <= step; i++) {
            document.getElementById('step'+i).classList.remove('completed');
        }
    }
}

function selectPaymentMethod(method) {
    document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    document.getElementById('cardPaymentForm').classList.add('d-none');
    if(method === 'card') {
        document.getElementById('cardPaymentForm').classList.remove('d-none');
    }
}

function updateSelectedTour() {
    const tourSelect = document.getElementById('tourSelect');
    const selectedOption = tourSelect.options[tourSelect.selectedIndex];
    document.getElementById('selectedTourImage').src = 'img/' + selectedOption.dataset.img;
    document.getElementById('selectedTourImage').alt = selectedOption.dataset.title;
    document.getElementById('selectedTourTitle').textContent = selectedOption.dataset.title;
    document.getElementById('selectedTourDescription').textContent = selectedOption.dataset.desc;
    document.getElementById('selectedTourPrice').textContent = 'от ' + selectedOption.dataset.price + ' ₽';
    const dateSelect = document.getElementById('tourDate');
    dateSelect.innerHTML = '<option value="" selected disabled>Выберите дату</option>';
    const dates = selectedOption.dataset.dates.split(',');
    dates.forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = date;
        dateSelect.appendChild(option);
    });
    document.getElementById('selectedTourDefaultDate').textContent = dates[0];
    updateSummary();
}

function updateSummary() {
    const tourSelect = document.getElementById('tourSelect');
    const selectedOption = tourSelect.options[tourSelect.selectedIndex];
    const participants = document.getElementById('participants').value;
    const insurance = document.getElementById('insurance').checked;
    let basePrice = parseInt(selectedOption.dataset.price);
    const insurancePrice = insurance ? 1200 * participants : 0;
    const totalPrice = basePrice * participants + insurancePrice;
    document.getElementById('summaryTourTitle').textContent = 'Тур "' + selectedOption.dataset.title + '"';
    document.getElementById('summaryTourPrice').textContent = basePrice.toLocaleString() + ' ₽';
    document.getElementById('summaryParticipants').textContent = participants + ' участник' + (participants > 1 ? 'а' : '');
    document.getElementById('summaryParticipantsPrice').textContent = '+' + (basePrice * (participants - 1)).toLocaleString() + ' ₽';
    document.getElementById('summaryInsurance').textContent = insurance ? 'Страховка (' + participants + ' чел.)' : 'Без страховки';
    document.getElementById('summaryInsurancePrice').textContent = insurance ? '+' + insurancePrice.toLocaleString() + ' ₽' : '+0 ₽';
    document.getElementById('summaryTotalPrice').textContent = totalPrice.toLocaleString() + ' ₽';
}

function updateConfirmationData() {
    const tourSelect = document.getElementById('tourSelect');
    const selectedOption = tourSelect.options[tourSelect.selectedIndex];
    document.getElementById('confirmTourTitle').textContent = selectedOption.dataset.title;
    document.getElementById('confirmTourDate').textContent = document.getElementById('tourDate').value;
    document.getElementById('confirmParticipants').textContent = document.getElementById('participants').value;
    document.getElementById('confirmInsurance').textContent = document.getElementById('insurance').checked ? 'Да' : 'Нет';
    document.getElementById('confirmTourImage').src = 'img/' + selectedOption.dataset.img;
    document.getElementById('confirmTourImage').alt = selectedOption.dataset.title;
    document.getElementById('confirmName').textContent = document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value;
    document.getElementById('confirmEmail').textContent = document.getElementById('email').value;
    document.getElementById('confirmPhone').textContent = document.getElementById('phone').value;
    document.getElementById('confirmPassport').textContent = document.getElementById('passport').value;
    const selectedMethod = document.querySelector('.payment-method.active h5').textContent;
    document.getElementById('confirmPaymentMethod').textContent = selectedMethod;
    if(selectedMethod === 'Банковская карта') {
        document.getElementById('confirmCardDetails').classList.remove('d-none');
        document.getElementById('confirmCardDetails').querySelector('p:first-child').textContent = 'Карта: **** **** **** ' + document.getElementById('cardNumber').value.slice(-4);
        document.getElementById('confirmCardDetails').querySelector('p:last-child').textContent = 'Срок: ' + document.getElementById('cardExpiry').value;
    } else {
        document.getElementById('confirmCardDetails').classList.add('d-none');
    }
}

function confirmOrder() {
    const confirmationForm = document.getElementById('confirmationSection');
    if(!document.getElementById('agreeTerms').checked) {
        confirmationForm.classList.add('was-validated');
        document.getElementById('agreeTerms').focus();
        return;
    }
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
}

function validateTourInfo() {
    const form = document.getElementById('tourOptionsForm');
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    form.classList.remove('was-validated');
    nextStep(2);
}

function validatePersonalInfo() {
    const form = document.getElementById('personalInfoForm');
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    form.classList.remove('was-validated');
    nextStep(3);
}

function validatePaymentInfo() {
    const selectedMethod = document.querySelector('.payment-method.active');
    if (!selectedMethod) {
        alert('Пожалуйста, выберите способ оплаты');
        return;
    }
    if (selectedMethod.querySelector('h5').textContent === 'Банковская карта') {
        const cardForm = document.getElementById('cardPaymentForm');
        if (!cardForm.checkValidity()) {
            cardForm.classList.add('was-validated');
            return;
        }
        cardForm.classList.remove('was-validated');
    }
    nextStep(4);
}

document.addEventListener('DOMContentLoaded', function() {
    const savedTour = sessionStorage.getItem('selectedTour');
    if (savedTour) {
        const tour = JSON.parse(savedTour);
        const tourSelect = document.getElementById('tourSelect');
        const options = tourSelect.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === tour.id) {
                options[i].selected = true;
                updateSelectedTour();
                const dates = tour.dates.split(',');
                if (dates.length > 0) {
                    document.getElementById('tourDate').value = dates[0];
                    document.getElementById('selectedTourDefaultDate').textContent = dates[0];
                }
                break;
            }
        }
        sessionStorage.removeItem('selectedTour');
    }
    updateStepIndicator(1);
    document.getElementById('tourSelect').addEventListener('change', updateSummary);
    document.getElementById('participants').addEventListener('change', updateSummary);
    document.getElementById('insurance').addEventListener('change', updateSummary);
    document.getElementById('phone').addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        let formattedValue = '';
        if (value.length > 0) {
            formattedValue = '+7';
            if (value.length > 1) {
                formattedValue += ' (' + value.substring(1, 4);
            }
            if (value.length > 4) {
                formattedValue += ') ' + value.substring(4, 7);
            }
            if (value.length > 7) {
                formattedValue += '-' + value.substring(7, 9);
            }
            if (value.length > 9) {
                formattedValue += '-' + value.substring(9, 11);
            }
        }
        this.value = formattedValue;
    });
    document.getElementById('passport').addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        let formattedValue = '';
        if (value.length > 0) {
            formattedValue = value.substring(0, 4);
            if (value.length > 4) {
                formattedValue += ' ' + value.substring(4, 10);
            }
        }
        this.value = formattedValue;
    });
    document.getElementById('cardNumber').addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        let formattedValue = '';
        for (let i = 0; i < value.length && i < 16; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        this.value = formattedValue;
    });
    document.getElementById('cardExpiry').addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        let formattedValue = '';
        if (value.length > 0) {
            formattedValue = value.substring(0, 2);
            if (value.length > 2) {
                formattedValue += '/' + value.substring(2, 4);
            }
        }
        this.value = formattedValue;
    });
});

function toggleSection(header) {
    const section = header.parentElement;
    const content = header.nextElementSibling;
    const arrow = header.querySelector('.arrow');
    if (content.classList.contains('show')) {
        content.classList.remove('show');
        arrow.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('show');
        arrow.style.transform = 'rotate(180deg)';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-clipboard-text');
            navigator.clipboard.writeText(textToCopy).then(() => {
                const tooltip = this.querySelector('.copy-tooltip');
                tooltip.classList.add('show');
                setTimeout(() => {
                    tooltip.classList.remove('show');
                }, 2000);
            });
        });
    });
    const currentPage = location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === 'index.html' && linkPage === '/') ||
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    const firstSection = document.querySelector('.section-header');
    if (firstSection) {
        toggleSection(firstSection);
    }
});