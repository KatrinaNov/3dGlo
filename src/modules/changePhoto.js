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

export default changePhoto;
