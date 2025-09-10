// Seleciona os elementos do formulário
const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const successMessage = document.getElementById('success-message');

// Adiciona um "ouvinte" de evento de 'submit' ao formulário
form.addEventListener('submit', (e) => {
    // Previne o comportamento padrão de envio do formulário
    e.preventDefault();
    
    // Reseta as mensagens de erro e sucesso
    emailError.textContent = '';
    passwordError.textContent = '';
    successMessage.textContent = '';

    // Variável para verificar se a validação falhou
    let isValid = true;

    // 1. Validação do campo de E-mail
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'O e-mail é obrigatório.';
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        emailError.textContent = 'Por favor, insira um e-mail válido.';
        isValid = false;
    }

    // 2. Validação do campo de Senha
    if (passwordInput.value.trim() === '') {
        passwordError.textContent = 'A senha é obrigatória.';
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        isValid = false;
    }

    // 3. Se todos os campos forem válidos, exibe a mensagem de sucesso
    if (isValid) {
        successMessage.textContent = 'Formulário enviado com sucesso!';
        // Aqui você pode adicionar a lógica para enviar os dados para um servidor
        form.reset();
    }
});

// Função para validar o formato do e-mail usando uma expressão regular
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}