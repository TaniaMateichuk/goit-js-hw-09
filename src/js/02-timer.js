import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const myInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let countDownTime = null;
let differenceBetweenDates = null;
let timerId;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const startDate = new Date();
    if (selectedDates[0] - startDate < 0) {
      // startBtn.disabled = true;
      alert('Select the date in the FUTURE');
    } else {
      btnStart.disabled = false;
      countDownTime = selectedDates[0];
    }
  },
};
const fr = flatpickr(myInput, options);

btnStart.addEventListener('click', onClick);

function onClick(evt) {
  btnStart.disabled = true;
  myInput.disabled = true;
  timerId = setInterval(() => {
    const currentDate = Date.now();
    differenceBetweenDates = countDownTime - currentDate;
    const time = convertMs(differenceBetweenDates);
    updateTimer(time);
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  if (differenceBetweenDates < 0) {
    clearInterval(timerId);
    btnStart.disabled = false;
    myInput.disabled = false;
    return;
  }

  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}