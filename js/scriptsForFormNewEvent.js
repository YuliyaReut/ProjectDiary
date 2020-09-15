// -------- create '+ Add new event' form  ---------
import {getArrayEvents, updatePage, getTimeInMin} from './generalScripts.js'
import {activeMonth, activeWeek, activeDay} from './scriptsForHeader.js';
import {createCalendar} from './scriptsForMonthPage.js';
import {createWeekCalendar} from './scriptsForWeekPage.js';
import {createDayCalendar} from './scriptsForDayPage.js';

function createFormNewEvent() {
  let container = document.createElement('div');
  container.id = 'form-container';
  document.body.append(container);
  let form = document.createElement('form');
  form.id = 'form-new-event';
  container.append(form);

  let label = document.createElement('label');  //closing form
  label.id = 'close-form-new-event';
  label.innerHTML = '&#65794;';
  form.append(label);

  let title = document.createElement('label');
  title.innerHTML = 'New event';
  form.append(title);
  form.append(document.createElement('hr'));

  form.append(createTableRow('text','Name'));
  form.append(createTableRow('text','Description'));
  form.append(createTableRow('date','Date'));
  form.append(createTableRow('time','Time from'));
  form.append(createTableRow('time','Time to'));

  let button = document.createElement('button');
  button.id = 'create-event';
  button.innerHTML = 'Create';
  button.type = 'button';
  form.append(button);

  //place for errors
  label = document.createElement('label');
  label.id = 'error';
  form.append(label);
}
function deleteFormNewEvent() {
  document.getElementById('form-container').remove();
  hideCover();
}
//creating modal window
function showCover() {
  let coverDiv = document.createElement('div');
  coverDiv.id = 'cover-div';
  document.body.style.overflowY = 'hidden';
  document.body.append(coverDiv);
}
function hideCover() {
  document.getElementById('cover-div').remove();
  document.body.style.overflowY = '';
}
//creating buttons for change time
function createButtonMore(value, timeHourMin) {
  let button = document.createElement('button');
  button.className = 'button-value-more';
  button.type='button';
  button.id = `${value}-${timeHourMin}-more`; 
  button.innerHTML = '&#8743;';
  return button;
}
function createButtonLess(value, timeHourMin) {
  let button = document.createElement('button');
  button.className = 'button-value-less';
  button.type='button';
  button.id = `${value}-${timeHourMin}-less`;
  button.innerHTML = '&#8744;';
  return button;
}

function createTimeValueRegulator(value, timeHourMin) {
  let divButtons = document.createElement('div');
  divButtons.append(createButtonMore(value, timeHourMin));
  divButtons.append(document.createElement('br'));
  divButtons.append(createButtonLess(value, timeHourMin));
  return divButtons;
}
function createTimeField(timeToFrom, timeHourMin){
  let input = document.createElement('input');
  input.type = 'text';
  input.className = 'inputRequired';
  input.id = `time-${timeHourMin}-${timeToFrom}`;
  input.placeholder = '00';
  return input;
}
function createTableRow(type, value, timeToFrom){
  let div = document.createElement('div');
  let label = document.createElement('label');
  label.innerHTML = value;
  div.append(label);
  if (type == 'time') {
    value = value.split(' ');
       // get 'from' or 'to' for id
    div.append(createTimeField(value[1],'hour'));
    div.append(createTimeValueRegulator(value.join('-').toLowerCase(),'hour'));
    div.append(createTimeField(value[1],'min'));
    div.append(createTimeValueRegulator(value.join('-').toLowerCase(),'min'));
 
  } else {
    let input = document.createElement('input');
    input.type = 'text';
    input.className = 'inputRequired long-input';
    input.id = value.toLowerCase();
    if ('date' == type) {
      input.placeholder = 'YYYY-MM-DD';
    }
    div.append(input);
  }
  return div;
}


//////////////////////work with form
function checkCorrectDate(elem) {
  let date = moment(elem.value,'YYYY-MM-DD');
  if (!date.isValid() || +date.format('YYYY') > +moment().format('YYYY') + 1 || +date.format('YYYY') < +moment().format('YYYY') - 1 ) {
    elem.style = 'border: 1px solid #DC143C;';
    throw new Error('Not a correct date!');
  }
}

export function checkFreeTime(timeFrom, timeTo, date) {
  let array = getArrayEvents(date);
  for (let i = 0; i < array.length; i++) {
    if ((getTimeInMin(timeFrom) > getTimeInMin(array[i].timeFrom) 
      && getTimeInMin(timeFrom) < getTimeInMin(array[i].timeTo) || getTimeInMin(timeTo) > getTimeInMin(array[i].timeFrom) 
      && getTimeInMin(timeTo) < getTimeInMin(array[i].timeTo)) ) {
      throw new Error('You already have some event in this time!');
    }
  }
  if (getTimeInMin(timeTo) <= getTimeInMin(timeFrom)) {
    throw new Error('"Time to" need to be more than "Time from"!');
  }
  if (timeFrom.split(':')[0] > 24 || timeFrom.split(':')[0] < 0 
      || timeFrom.split(':')[1] > 59 || timeFrom.split(':')[1] < 0) {
    throw new Error('Not a correct field "Time from!"');
  }
  if (timeTo.split(':')[0] > 24 || timeTo.split(':')[0] < 0 
      || timeTo.split(':')[1] > 59 || timeTo.split(':')[1] < 0) {
    throw new Error('Not a correct field "Time to!"');
  }
}
export function checkCorrectField(elem, place) {
  elem.style = 'border: 1px solid gray;';
  if (elem.value == '') {
    elem.style = 'border: 1px solid #DC143C;';
    throw new Error('Not a correct ' + place + '!' );
  }
}
export function buttonMoreValue(elem){
  let value = +elem.value;
  switch (true) {    //change field with hours
    case elem.id.indexOf('hour') != -1:
        switch (true) {
          case typeof value == 'number' && Number.isInteger(value) && value >= 0 && value <23: 
              switch (true) {
                case value >= 0 && value < 9:
                    value +=1;
                    return '0' + value; 
                    break;
                default: 
                    return value + 1;
              }
              break;
          case value == 23:
              return '00';
              break;
          case value == 24: 
              return '01';
              break;
          default:
              throw new Error('Not correct hours!');
        }
        break;
    default:    //change field with minutes
        switch (true) {
          case typeof value == 'number' && Number.isInteger(value) && value >= 0 && value <59:
              switch (true) {
                case value >= 0 && value < 9:
                    value +=1;
                    return '0' + value;
                    break;
                default:
                    return value + 1;
              }
              break;
          case value == 59:
              return '00';
              break;
          default: 
              throw new Error('Not correct minutes!');
        }
  }
}
export function buttonLessValue(elem) {
  let value = +elem.value;
  switch (true) {
    case elem.id.indexOf('hour') != -1:      //change field with hours
        switch (true) {
          case typeof value == 'number' && Number.isInteger(value) && value > 0 && value <=24:
              switch (true) {
                case value > 0 && value < 11:
                    value -=1;
                    return '0' + value;
                    break;
                default:
                    return value - 1;
              }
              break;
          case value == 0:
              return '23';
              break;
          default:
              throw new Error('Not correct hours!');
        } 
        break;
    default:
        switch (true) {
          case typeof value == 'number' && Number.isInteger(value) && value > 0 && value <=59:
              switch (true) {
                case value >= 0 && value < 9:  //change field with minutes
                    value -=1;
                    return '0' + value;
                    break;
                default:
                    return value - 1;
              }
              break;
          case value == 0:
              return '59';
              break;
          default:
              throw new Error('Not correct minutes!');
        }
  }
}

//set onclick for buttons to change values in form
function setOnClickButton(idButton, idElement, func) {
  document.getElementById(idButton).onclick = function() {
    let errorField = document.getElementById('error');
    let elem = document.getElementById(idElement);
    try {
      errorField.innerHTML = '';
      elem.style = 'border: 1px solid gray;';
      elem.value = func(elem);
    } catch(e) {
      elem.style = 'border: 1px solid #DC143C;';
      errorField.innerHTML = e;

    }
  }
}
//adding a new event
export function addNewEvent() {
  showCover();
  createFormNewEvent();

  let arrayOfButtons = [['time-from-hour-more','time-hour-from',buttonMoreValue],
                        ['time-from-hour-less','time-hour-from',buttonLessValue],
                        ['time-from-min-more','time-min-from',buttonMoreValue],
                        ['time-from-min-less','time-min-from',buttonLessValue],
                        ['time-to-hour-more','time-hour-to',buttonMoreValue],
                        ['time-to-hour-less','time-hour-to',buttonLessValue],
                        ['time-to-min-more','time-min-to',buttonMoreValue],
                        ['time-to-min-less','time-min-to',buttonLessValue]]

  for (let i=0; i < arrayOfButtons.length; i++) {
    setOnClickButton(...arrayOfButtons[i]);
  }
  document.getElementById('close-form-new-event').onclick = function() { deleteFormNewEvent(); };
  document.getElementById('create-event').onclick = function() {
    try {
      let name = document.getElementById('name');
      let date = document.getElementById('date');
      let description = document.getElementById('description');
      let timeFrom = getTimeFromTo(document.getElementById('time-hour-from').value,document.getElementById('time-min-from').value);
      let timeTo = getTimeFromTo(document.getElementById('time-hour-to').value,document.getElementById('time-min-to').value);
      checkCorrectField(name, 'name');
      checkCorrectDate(date);
      checkCorrectField(document.getElementById('time-hour-from'), 'time');
      checkCorrectField(document.getElementById('time-min-from'), 'time');
      checkCorrectField(document.getElementById('time-hour-to'), 'time');
      checkCorrectField(document.getElementById('time-min-to'), 'time');
      checkFreeTime(timeFrom, timeTo, moment(date.value,'YYYY-MM-DD'));
      setEvent(name.value, description.value, date.value, timeFrom, timeTo);

      alert('Successfully added new event!');
      updatePage();
      if (activeMonth) {
        createCalendar(document.getElementById('main-content'),moment());
      } else if (activeWeek) {
        createWeekCalendar(document.getElementById('main-content'),moment());
      } else createDayCalendar(document.getElementById('main-content'),moment());
      deleteFormNewEvent();
    } catch (e) {
      document.getElementById('error').innerHTML = e;
    }
  };
}
function setEvent(name, description, date, timeFrom, timeTo) {
  let obj = {
    name: name,
    description: description,
    date: date,
    timeFrom: timeFrom,
    timeTo: timeTo,
  };
  window.localStorage.setItem(`${date}_${name}-${timeFrom}`, JSON.stringify(obj));
}

function getTimeFromTo(timeHour, timeMin) {
  return `${timeHour}:${timeMin}`;
}
