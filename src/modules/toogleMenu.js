const toogleMenu = () => {
  const menu = document.querySelector('menu');
  const handlerMenu = () => {
    menu.classList.toggle('active-menu');
  };
  document.body.addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('close-btn') || target.closest('menu li a') || target.closest('.menu')) {
      handlerMenu();
    } else if (target.tagName !== 'MENU' && target.tagName !== 'LI') {
      menu.classList.remove('active-menu');
    }
  });
};

export default toogleMenu;
