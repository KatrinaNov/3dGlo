window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line strict
  'use strict';
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
        popUp.style.display = 'block';
      });
    });
    popupClose.addEventListener('click', () => {
      popUp.style.display = 'none';
    });
  };
  tooglePopUp();



});
