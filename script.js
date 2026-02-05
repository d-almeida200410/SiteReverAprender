// Menu mobile
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainMenu = document.getElementById('mainMenu');

mobileMenuBtn.addEventListener('click', () => {
    mainMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = mainMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Fechar menu ao clicar em um link
const menuLinks = document.querySelectorAll('nav a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mainMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Ativar link ativo na navegação
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Formulário de contato funcional com EmailJS
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

// Verificar se o EmailJS está carregado
window.onload = function() {
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS não carregado corretamente');
        showNotification('Erro de configuração do formulário. Entre em contato diretamente pelo telefone.', 'error');
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Formulário indisponível';
    }
};

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validação simples
    const name = contactForm.from_name.value.trim();
    const email = contactForm.reply_to.value.trim();
    const message = contactForm.message.value.trim();
    
    if (!name || !email || !message) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor, insira um email válido.', 'error');
        return;
    }
    
    // Desabilitar botão durante o envio
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    try {
        // SUAS CREDENCIAIS DO EMAILJS (SUBSTITUA COM AS SUAS)
        const serviceID = "service_evgybzr"; // Seu Service ID do EmailJS
        const templateID = "template_glro8dd"; // Seu Template ID do EmailJS
        
        // Enviar email usando EmailJS
        const response = await emailjs.send(serviceID, templateID, {
            from_name: name,
            reply_to: email,
            phone: contactForm.phone.value || 'Não informado',
            message: message,
            to_email: 'reveraprenderrefoco@gmail.com',
            date: new Date().toLocaleString('pt-BR')
        });
        
        console.log('Email enviado com sucesso:', response);
        
        // Sucesso
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        contactForm.reset();
        
    } catch (error) {
        console.error('Erro ao enviar:', error);
        showNotification('Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente pelo telefone: (91) 98807-4549', 'error');
        
    } finally {
        // Reativar botão
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Enviar Mensagem';
    }
});

// Função para mostrar notificação
function showNotification(message, type) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // Ícone baseado no tipo
    const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
    const bgColor = type === 'success' ? '#10b981' : '#ef4444';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Estilos para a notificação
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Adicionar ao body
    document.body.appendChild(notification);
    
    // Adicionar evento para fechar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentElement) {
                document.body.removeChild(notification);
            }
        }, 300);
    });
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentElement) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Adicionar estilos CSS para animações de notificação
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
        font-size: 0.9rem;
    }
`;
document.head.appendChild(notificationStyles);

// Efeito de header ao rolar
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '0.7rem 0';
    } else {
        header.style.padding = '1rem 0';
    }
});

// Animações ao rolar
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
const animateElements = document.querySelectorAll('.schedule-card, .feature-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});