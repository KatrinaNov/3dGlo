const smoothTransition = () => {
  const anchors = document.querySelectorAll('a[href*="#"]');
  for (const anchor of anchors) {
    anchor.addEventListener('click', e => {
      e.preventDefault();

      const blockID = anchor.getAttribute('href').substr(1);
      if (blockID && blockID !== 'close') {
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
};


export default smoothTransition;
