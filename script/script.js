window.addEventListener('DOMContentLoaded', function() {
  'use strict';
  // таймер
  function countTimer(deadline) {
    let timerhours = document.querySelector('#timer-hours'),
        timerminutes = document.querySelector('#timer-minutes'),
        timerseconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
          let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor((timeRemaining / 3600) % 24);
          // day = Math.floor(timeRemaining / 3600 /24)
          return {timeRemaining, hours, minutes, seconds};
        }
        function updateClock() {
          let timer = getTimeRemaining();

          timerhours.textContent = timer.hours;
          timerminutes.textContent = timer.minutes;
          timerseconds.textContent = timer.seconds;
          if (timer.timeRemaining > 0) {
            setTimeout(updateClock, 1000);
          }
        }
        updateClock();
        
  }
  countTimer('01 July 2020');
});