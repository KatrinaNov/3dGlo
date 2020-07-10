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
    const menu = document.querySelector('menu');
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };
    document.body.addEventListener('click', event => {
      const target = event.target;
      if (target.classList.contains('close-btn') || target.closest('menu li') || target.closest('.menu')) {
        handlerMenu();
      } else if (target.tagName !== 'MENU') {
        menu.classList.remove('active-menu');
      }
    });
  };
  toogleMenu();

  // поп-ап
  const tooglePopUp = () => {
    const popUp = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn');

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

    popUp.addEventListener('click', event => {
      let target = event.target;
      if (target.classList.contains('popup-close')) {
        popUp.style.opacity = 0;
        popUp.style.visibility = 'hidden';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popUp.style.opacity = 0;
          popUp.style.visibility = 'hidden';
        }
      }
    });
  };
  tooglePopUp();

  // табы
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');
    const toogleTabContent = index => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    tabHeader.addEventListener('click', event => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toogleTabContent(i);
          }
        });
      }
    });
  };
  tabs();

  // слайдер
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      dotsList = document.querySelector('.portfolio-dots'),
      slider = document.querySelector('.portfolio-content');

    let currentSlide = 0, // номер слайда
      interval;
    // добавляем точек столько, сколько слайдов
    const addDots = () => {
      for (let i = 0; i < slide.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dotsList.append(dot);
      }
    };
    addDots();
    const dot = document.querySelectorAll('.dot');

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };
    // автопрокрутка слайда
    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };
    // запуск автопрокрутки
    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    // остановка автопрокрутки
    const stopSlide = () => {
      clearInterval(interval);
    };
    // переключение по клику на стрелки и точки
    slider.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((item, index) => {
          if (item === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });
    // остановка автопрокрутки при наведении на точки или стрелки
    slider.addEventListener('mouseover', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });
    // запуск автопрокрутки при уведении мышки  с точкек или стрелок
    slider.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });
    startSlide(2000);
  };
  slider();

  // наша команда
  const changePhoto = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');
    commandPhoto.forEach(item => {
      const src = item.src;
      item.addEventListener('mouseenter', e => {
        e.target.src = e.target.dataset.img;
      });
      item.addEventListener('mouseout', e => {
        e.target.src = src;
      });

    });
  };
  changePhoto();

  // калькулятор
  const calc = (price = 100) => {
    const calcInput = document.querySelectorAll('.calc-item[type=text]');
    calcInput.forEach(item => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/\D/g, '');
      });
    });

    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcCount = document.querySelector('.calc-count'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;
      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }
      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      // перебор чисел (эффект для итоговой суммы)
      const numberAnimate = () => {
        let currentValue = +totalValue.textContent;
        const newValue = Math.floor(total);
        if (currentValue < newValue) {
          currentValue += 10;
        } else if (currentValue > newValue) {
          currentValue -= 10;
        } else {
          clearInterval(countNumber);
        }
        totalValue.textContent = currentValue;
      };
      const countNumber = setInterval(numberAnimate, 1);
      numberAnimate();
    };
    calcBlock.addEventListener('change', event => {
      const target = event.target;

      if (target.matches('select') || target.matches('input')) {
        countSum();
      }
    });

  };
  calc(100);

  // send-ajax-form
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
      successMessage = 'Спасибо за заявку! Мы скоро с вами свяжемся!';

    const form1 = document.getElementById('form1'),
      form2 = document.getElementById('form2'),
      form3 = document.getElementById('form3'),
      answerPopup = document.querySelector('.answer'),
      answerContent = answerPopup.querySelector('.answer-content'),
      loader = answerPopup.querySelector('.loader'),
      popup = document.querySelector('.popup');

    // модальное окно с благодарностью
    const answerHandler = (form, message) => {
      answerPopup.addEventListener('click', e => {
        if (e.target.classList.contains('answer-close')) {
          answerPopup.classList.remove('active');
        } else {
          const target = e.target.closest('.answer-content');
          if (!target) {
            answerPopup.classList.remove('active');
          }
        }
      });
      // скрываем попап, если он есть
      popup.style.opacity = 0;
      popup.style.visibility = 'hidden';
      // убираем прелоадер, появляется модалка с текстом
      loader.style.display = 'none';
      answerContent.style.display = 'block';
      answerPopup.querySelector('.answer-text').textContent = message;
      // очищаем форму
      form.reset();
    };

    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();

      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });

      request.open('POST', '../server.php');
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(body));
    };

    function formListener(form) {
      form.addEventListener('submit', event => {
        event.preventDefault();
        // запускается прелоадер
        answerPopup.classList.add('active');
        loader.style.display = 'flex';
        answerContent.style.display = 'none';
        // создаем объект с данными формы
        const formData = new FormData(form);
        const body = {};
        formData.forEach((val, key) => {
          body[key] = val;
        });
        postData(body, () => {
          answerHandler(form, successMessage);
        },
        error => {
          answerHandler(form, errorMessage);
          console.log(error);
        });
      });
    }
    formListener(form1);
    formListener(form2);
    formListener(form3);

  };
  sendForm();
});
