
//--- СТВОРЮЄМО ОБ'ЄКТ ДЛЯ ЗБЕРЕЖЕННЯ ДАНИХ ---//
let formData = {
    email: '',
    message: '',
};

//--- ОТРИМУЄМО ДОСТУП ДО ЕЛЕМЕНТІВ ФОРМИ ТА КЛЮЧ ДЛЯ ДАНИХ ---//
const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const emailMessage = form.elements.message;
const STORAGE_KEY = 'feedback-form-state';

//--- ЯКЩО У ЛОКАЛЬНОМУ СХОВИЩІ Є ДАНІ ТО ЗАПИСУЄМО ЇХ У ПОЛЯ ---///
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
    
    try {
        formData = JSON.parse(savedData);

        emailInput.value = formData.email || '';

        emailMessage.value = formData.message || '';

    } catch (error) {
        console.error('Something gone wrong!', error);        
    }
}

//--- ОНОВЛЮЄМО ТА ЗБЕРІГАЄМО У ЛОКАЛЬНЕ СХОВИЩЕ ДАНІ ---//
form.addEventListener('input', e => {
    const { name, value } = e.target;

    if (name in formData) {
        formData[name] = value;

        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    };
});

//--- ПЕРЕВІРЯЄМО ЧИ ЗАПОВНЕНІ УСІ ПОЛЯ ТА ВІДПРАВЛЯЄМО ФОРМУ ---//
form.addEventListener('submit', e => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.message.trim()) {
        alert('Fill please all fields');
        return;
    }

    console.log(formData);

    localStorage.removeItem(STORAGE_KEY);

    formData = { email: '', message: '', };

    form.reset();
    
});