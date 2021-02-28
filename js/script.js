'use strict';

document.addEventListener('DOMContentLoaded', () => {
//  Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');

    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //  Timer
    const deadLine = "2021-02-11";

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (10000 * 360 * 24)),
              hours = Math.floor( (t / (1000 * 360)) %24),
              minutes = Math.floor((t / (1000 * 60)) %60),
              seconds = Math.floor((t / 1000) %60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setCloak (selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        
        updateClock();

        function updateClock () {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setCloak('.timer', deadLine);

    //  Modal


    const modalTrigger = document.querySelectorAll('[data-modal'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');
    
    function openModal () {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimer);
    }
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });


    modalCloseBtn.addEventListener('click', () => {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = '';
    });



    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimer = setTimeout(openModal, 5000);

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // 48 class

    // Создать див menu__item
    // 
    // 4 аргумента (название, текст, цена, картинка)
    // Передаем только аргументы, чтобы создать 




    class CreateMenu {
        constructor(menu, text, price, img) {
            this.menu = menu;
            this.text = text;
            this.price = price;
            this.img = img;
            this.transfer = 27;
            // this.parent = document.querySelector(parentSlector);
            this.changetoUAH();
        }
        
        newElement() {
            const newEl1 = document.querySelector('.menu .container');
            // const newEl2 = newEl1.querySelector('.container');
            newEl1.insertAdjacentHTML('beforeend', `<div class="menu__item">
                <img src="img/tabs/${this.img}.jpg" alt="${this.img}">
                <h3 class="menu__item-subtitle">${this.menu}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>`); 
        }

        changetoUAH() {
            this.price = this.price * this.transfer;
        }

    }

   new CreateMenu(
       'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        15,
         'vegy'
         ).newElement();

    new CreateMenu(
    'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
        7,
        'elite'
        ).newElement();
    
    new CreateMenu(
    'Меню "Постное""',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ', 
        9,
        'post'
        ).newElement();


    // const vegan = new CreateMenu('Меню "Фитнес"', 
    // 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
    // 229, 'vegy');
  

});