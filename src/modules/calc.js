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

    const currentValue = +totalValue.textContent;
    const newValue = Math.floor(total);
    // эффект перебора цифр в итоговой сумме
    const animate = ({ timing, draw, duration }) => {
      const start = performance.now();
      requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;
        // вычисление текущего состояния анимации
        const progress = timing(timeFraction);
        draw(progress); // отрисовать её
        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
      });
    };
    animate({
      duration: 500,
      timing(timeFraction) {
        return timeFraction;
      },
      draw(progress) {
        totalValue.textContent = currentValue + Math.ceil((newValue - currentValue) * progress);
      }
    });
  };
  calcBlock.addEventListener('input', event => {
    const target = event.target;

    if (target.matches('select') || target.matches('input')) {
      countSum();
    }
  });

};
export default calc;
