// import checkNumInputs from './checkNumInputs.js'

import { postData } from "../services/requests";
const forms = () => {
    const form = document.querySelectorAll('form'), // получаем все формы на странице
        inputs = document.querySelectorAll('input'), //получаем все инпуты на странице
        upload = document.querySelectorAll('[name="upload"]')



    // checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };


    const clearInputs = () => {// очистка всез инпутов
        inputs.forEach((item) => {
            item.value = ''
        })
        upload.forEach(item =>{
            item.previousElementSibling.textContent = 'Файл не выбран';
        })
    }
    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0])
            let dots;
            const arr = item.files[0].name.split('.');
            arr[0].length > 5 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0,6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        })
    })

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();//отменяем перезагрузку при отправке формы

            let statusMessage = document.createElement('div');//создаем новый блок с сообщением статуса
            statusMessage.classList.add('status');//добавляем новому блоку класс
            item.parentNode.appendChild(statusMessage); //помещаем элемент на страницу

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');//создаем элемент с оповещением
            statusImg.setAttribute('src', message.spiner);//устанавливаем через атрибут путь к картинке
            statusImg.classList.add('animated', 'fadeInUp');//добавляем классы для анимации              
            statusMessage.appendChild(statusImg);//и добавляем картинку на страницу

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;//добавляем сообщение
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item); //собираем данные с формы для дальнейшей отправки
            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);


            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;

                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000)
                })
        })
    })
};

export default forms;