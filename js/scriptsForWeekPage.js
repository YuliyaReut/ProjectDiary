let dateWeekTable; //date with a first day next week
export let dateOnPage = moment();
import {sign , panel} from './scriptsForHeader.js'
import {createBlockEvent, getArrayEvents, dayOfWeek, updatePage} from './generalScripts.js'


export function createWeekCalendar(elem, date) {
  let table = document.createElement('table');
  table.id = 'table-week';
  elem.append(table);

  let tr = document.createElement('tr');
  for (let i = 0; i < dayOfWeek.length; i++) {
    let th = document.createElement('th');
    th.innerHTML = dayOfWeek[i];
    tr.append(th);
  }
  table.appendChild(tr);
  let day = moment(date.subtract(date.isoWeekday()-1,'days'));   //get a number of monday
  tr = document.createElement('tr');
  for (let i = 0; i<7; i++) {
    let td = document.createElement('td');
    if (day.format('DD') == moment().format('DD')) {
      let div = document.createElement('div');
      div.innerHTML = day.format('DD');
      div.id = 'today-week-calendar';
      td.append(div);
    } else {
      td.innerHTML = day.format('DD');
    }
    let block = document.createElement('div');
    block.style.height = '550px';
    block.style.overflowY = 'scroll';
    let arrayEventsDay = getArrayEvents(day);
    for (let i = 0; i < arrayEventsDay.length; i++) {
      createBlockEvent(block, arrayEventsDay[i]);
    }
    td.append(block);
    tr.append(td);
    day.add(1,'days');

  }
  table.append(tr);
  changeDateOnPage(day.subtract(7,'days'));
  dateWeekTable = moment(day.add(1,'days')); //date where the first day is a first day of week (monday);
}


//date on page in the header
export function changeDateOnPage(date) {
  document.getElementById('date-on-page').innerHTML = '';
  let label = document.createElement('label');
  label.innerHTML = date.format('DD MMMM YYYY') + ' - ' + date.add(6,'days').format('DD MMMM YYYY');;
  document.getElementById('date-on-page').appendChild(label);
  dateOnPage = date;
}
export function showNextWeek() {
  updatePage();
  createWeekCalendar(document.getElementById('main-content'), dateWeekTable);
}
export function showPreviousWeek() {
  let date = moment(dateWeekTable.subtract(14,'days'));
  updatePage();
  createWeekCalendar(document.getElementById('main-content'),date);
}
