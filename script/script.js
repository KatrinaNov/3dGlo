window.addEventListener('DOMContentLoaded', function() {
  'use strict';
  // таймер
  function countTimer(deadline) {
    let timerhours = document.querySelector('#timer-hours'),
        timerminutes = document.querySelector('#timer-minutes'),
        timerseconds = document.querySelector('#timer-seconds'),
        timeInterval = setInterval(updateClock, 1000);

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor((timeRemaining / 3600));
      // day = Math.floor(timeRemaining / 3600 /24)
      return {timeRemaining, hours, minutes, seconds};
    }

    function addZero(num) {
      if (num <= 9) {
        return '0' + num;
      } else {
        return num;
      }
    }
    function updateClock() {
      let timer = getTimeRemaining();
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
    }        
  }
  countTimer('2 july 2020');
});