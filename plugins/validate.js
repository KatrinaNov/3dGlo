class Validator {
  constructor({ selector, pattern = {}, method }) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter(item => item.tagName.toLowerCase() !== 'button' && item.type !== 'button');
    this.error = new Set();
  }

  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
    // чтобы изначально не отправлялась пустая форма
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.elementsForm.forEach(elem => this.checkIt({ target: elem }));
      if (this.error.size) {
        e.preventDefault();
      }
    });
  }

  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem) {
        if (elem.value.trim() === '') {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };
    if (this.method) {
      const method = this.method[elem.id];

      if (method) {
        return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
      }
    } else {
      console.warn('Необходимо передать id полей ввода и методы проверки');
    }
    return true;
  }

  checkIt(event) {
    const target = event.target;
    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }
  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      return;
    }
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validator-error');
    elem.insertAdjacentElement('afterend', errorDiv);

  }
  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('success');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      elem.nextElementSibling.remove();
    }
  }
  applyStyle() {
    const style = document.createElement('style');
    style.textContent = `
    input.success {
      border: 2px solid green!important;
    }
    input.error {
      border: 2px solid red!important;
    }
    .validator-error {
      font-family: sans-serif;
      font-size: 12px;
      color: red;
      position: absolute;
      bottom: -15px;
    }
    `;
    document.head.appendChild(style);
  }
  setPattern() {
    if (!this.pattern.email) {
      this.pattern.email = /^.+@\w+\.\w{2,}$/;
    }
    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }
  }
}





const valid1 = new Validator({
  selector: '#form1',
  pattern: {
    name: /^[а-яё\s]+$/i,
    zip: /\d{5,6}/
  },
  method: {
    'form1-name': [
      ['notEmpty'],
      ['pattern', 'name']
    ],
    'form1-phone': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],
    'form1-email': [
      ['notEmpty'],
      ['pattern', 'email']
    ]
  }
});
valid1.init();
const valid2 = new Validator({
  selector: '#form2',
  pattern: {
    name: /^[а-яё\s]+$/i,
    zip: /\d{5,6}/
  },
  method: {
    'form2-name': [
      ['notEmpty'],
      ['pattern', 'name']
    ],
    'form2-phone': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],
    'form2-email': [
      ['notEmpty'],
      ['pattern', 'email']
    ],
    'form2-message': [
      ['notEmpty'],
      ['pattern', 'name']
    ]
  }
});
valid2.init();
const valid3 = new Validator({
  selector: '#form3',
  pattern: {
    name: /^[а-яё\s]+$/i,
    zip: /\d{5,6}/
  },
  method: {
    'form3-name': [
      ['notEmpty'],
      ['pattern', 'name']
    ],
    'form3-phone': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],
    'form3-email': [
      ['notEmpty'],
      ['pattern', 'email']
    ]
  }
});
valid3.init();
