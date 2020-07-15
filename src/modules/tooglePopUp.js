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
export default tooglePopUp;