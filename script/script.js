window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line strict
  'use strict';

  // плавный переход по якорным ссылкам
  const smoothTransition = () => {
    const links = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
      speed = 0.5;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
    links.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const scrollHeight = window.scrollY,  // пиксели, которые были пролистаны на данный момент от начала
          hash = this.href.replace(/[^#]*(.*)/, '$1'), // к id элемента, к которому нужно перейти
          idY = document.querySelector(hash).getBoundingClientRect().top;  // отступ от окна браузера до id
        let start = null;
        const scrollAnimation = time => {
          if (!start) { start = time; }
          const progress = time - start,
            r = (idY < 0 ?
              Math.max(scrollHeight - progress / speed, scrollHeight + idY) :
              Math.min(scrollHeight + progress / speed, scrollHeight + idY));
          window.scrollTo(0, r);
          if (r !== scrollHeight + idY) {
            requestAnimationFrame(scrollAnimation);
          } else {
            cancelAnimationFrame(scrollAnimation);  // URL с хэшем
          }
        };
        requestAnimationFrame(scrollAnimation);
      });
    });
  };
  smoothTransition();

  // таймер
  const countTimer = deadline => {
    const timerhours = document.querySelector('#timer-hours'),
      timerminutes = document.querySelector('#timer-minutes'),
      timerseconds = document.querySelector('#timer-seconds');


    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor((timeRemaining / 3600));
      // day = Math.floor(timeRemaining / 3600 /24)
      return { timeRemaining, hours, minutes, seconds };
    };

    const addZero = num => {
      if (num <= 9) {
        return '0' + num;
      } else {
        return num;
      }
    };
    const updateClock = () => {
      const timer = getTimeRemaining();
      timerhours.textContent = addZero(timer.hours);
      timerminutes.textContent = addZero(timer.minutes);
      timerseconds.textContent = addZero(timer.seconds);

      // когда время вышло, останавливаем отсчет и обнуляем время
      if (timer.timeRemaining <= 0) {
        clearInterval(timeInterval);
        timerhours.textContent = '00';
        timerminutes.textContent = '00';
        timerseconds.textContent = '00';
      }
    };
    const timeInterval = setInterval(updateClock, 1000);
  };
  countTimer('30 july 2020');

  // меню
  const toogleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };
    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach(item => item.addEventListener('click', handlerMenu));
  };
  toogleMenu();

  // поп-ап
  const tooglePopUp = () => {
    const popUp = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close');

    popupBtn.forEach(item => {
      item.addEventListener('click', () => {
        let showAnimate;
        let count = 0;
        popUp.style.visibility = 'visible';
        const show = () => {
          showAnimate = requestAnimationFrame(show);
          count += 0.02;
          if (count <= 1) {
            popUp.style.opacity = count;
          } else {
            cancelAnimationFrame(showAnimate);
          }
        };
        if (window.innerWidth < 768) {
          popUp.style.opacity = 100;
        } else {
          showAnimate = requestAnimationFrame(show);
        }
      });
    });
    popupClose.addEventListener('click', () => {
      popUp.style.opacity = 0;
      popUp.style.visibility = 'hidden';


    });
  };
  tooglePopUp();



});
