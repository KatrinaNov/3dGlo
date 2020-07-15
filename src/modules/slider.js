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

export default slider;