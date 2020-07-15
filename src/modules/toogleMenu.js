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

export default toogleMenu;