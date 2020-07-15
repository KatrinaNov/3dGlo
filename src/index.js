import 'mdn-polyfills/Node.prototype.append';
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import "es6-promise";
import "fetch-ie8";
import elementClosest from 'element-closest';
elementClosest(window);
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();


import smoothTransition from './modules/smoothTransition';
import countTimer from './modules/countTimer';
import toogleMenu from './modules/toogleMenu';
import tooglePopUp from './modules/tooglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changePhoto from './modules/changePhoto';
import calc from './modules/calc';
import maskPhone from './modules/maskPhone';
import sendForm from './modules/sendForm';

// плавный переход по якорным ссылкам
smoothTransition();

// таймер
countTimer('30 july 2020');

// меню
toogleMenu();

// поп-ап
tooglePopUp();

// табы
tabs();

// слайдер
slider();

// наша команда
changePhoto();

// калькулятор
calc(100);

// маска телефона
maskPhone('.form-phone');

// send-fetch-form
sendForm();
