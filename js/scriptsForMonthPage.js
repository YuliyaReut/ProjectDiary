
import {createBlockEvent, getArrayEvents, dayOfWeek, updatePage} from './generalScripts.js'
import {createDayCalendar} from './scriptsForDayPage.js'
import {date, activeMonth, activeDay} from './scriptsForHeader.js'
// creating Calendar for month
export function createCalendar(elem, date) {
  let month = date.format('MM');


  let table = document.createElement('table');
  table.id = 'table-days';
  elem.append(table);

  let tr = document.createElement('tr');
  for (let i = 0; i < dayOfWeek.length; i++) {
    let th = document.createElement('th');
    th.innerHTML = dayOfWeek[i];
    tr.append(th);
  }
  table.appendChild(tr);
  tr = document.createElement('tr');
  date = moment(date.format('YYYY-MM')+'-01', 'YYYY-MM-DD');
  for (let i = 0; i < date.isoWeekday()-1; i++) {       //creating empty cells until the first day of month
    tr.append(document.createElement('td'));
  }

   //return to the first day of month
  while (date.format('MM') == month) {
    let td = document.createElement('td');
    let day = date.format('D');
    let currentDate = moment(date);
    if (moment().format('D') == day) {
      let div = document.createElement('div');
      div.innerHTML = day;
      div.id = 'today';    //highlighting the day 'today'
      td.append(div);
    } else {
      td.innerHTML = day;
    }

    let arrayDayEvents = getArrayEvents(date);
    let arrayLength = arrayDayEvents.length;
    if (arrayLength <= 3) {
      for (let i = 0; i < arrayLength; i++) {
        createBlockEvent(td, arrayDayEvents[i]);
      }
    } else {
      for (let i = 0; i < 3; i++) {
        createBlockEvent(td, arrayDayEvents[i]);
      }
      let div = document.createElement('div');
      div.innerHTML = '+ ' + (+arrayLength-3) +' more';
      div.className = 'button-x-more';
      div.onclick = function() {
        updatePage();
        createDayCalendar(elem, currentDate);
      }
      td.append(div);
    }

    tr.appendChild(td);
    if (date.isoWeekday() %7 == 0) {
      table.append(tr);
      tr = document.createElement('tr');
    }
    date.add(1,'days');
  }
  let lastDay = moment(date);
  lastDay.subtract(1,'days');
  if (lastDay.isoWeekday() != 0) {        //creating empty cells after the last day of month
    for (let i = lastDay.isoWeekday(); i < 7; i++) {
      tr.appendChild(document.createElement('td'));
    }
  }
  table.append(tr);
  changeDateOnPage(date.subtract(1,'months'));
}
function changeDateOnPage(date) {
  document.getElementById('date-on-page').innerHTML = '';
  let label = document.createElement('label');
  label.innerHTML = date.format('MMMM YYYY');
  document.getElementById('date-on-page').appendChild(label);
}
export function showNextMonth() {
  updatePage();
  createCalendar(document.getElementById('main-content'), date.add(1,'months'));
}
export function showPreviousMonth() {
  updatePage();
  createCalendar(document.getElementById('main-content'), date.subtract(1,'months'));
}
