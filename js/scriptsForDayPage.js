
import {createBlockEvent, getArrayEvents, dayOfWeek, getTimeInMin, updatePage, randomInteger} from './generalScripts.js'
import {date} from './scriptsForHeader.js'

export function createDayCalendar (elem, date){
  let table = document.createElement('table');
  table.id = 'day-table';
  elem.appendChild(table);

  let tr = document.createElement('tr');
  let td = document.createElement('td');

  let time;
  time = moment('00 00','kk mm');
  
  for (let i = 0; i<24; i++) {
    tr = document.createElement('tr');
    td = document.createElement('td');

    let timeFrom = moment(time.format('kk:mm'),'kk:mm');
    let timeTo = moment(time.add(1,'hours').format('kk:mm'), 'kk:mm');
    td.innerHTML = `${timeFrom.format('kk:mm')}-${timeTo.format('kk:mm')}`;
    tr.append(td);
    td = document.createElement('td');
    td.id = `table-string-${i}`;
    let events = getArrayEvents(date);

    for (let i = 0; i < events.length; i++) {
      let div = document.createElement('div');
      let title = `${events[i].name} ${events[i].timeFrom}-${events[i].timeTo}`;
      div.innerHTML = title;
      div.className = `block-event-in-table-month-${randomInteger(1,3)} block-event-in-table-month`;
      if (getTimeInMin(events[i].timeFrom) >= getTimeInMin(timeFrom.format('kk:mm')) && getTimeInMin(events[i].timeFrom) < getTimeInMin(timeTo.format('kk:mm'))) {
        if (getTimeInMin(events[i].timeTo) > getTimeInMin(timeTo.format('kk:mm'))) {
          let height = +getTimeInMin(events[i].timeTo) - +getTimeInMin(events[i].timeFrom);
          div.style = `margin-top: ${(+getTimeInMin(events[i].timeFrom) - +getTimeInMin(timeFrom.format('kk:mm')))/2}px`;
          div.style.minHeight =  `${+(height/2-5)}px`;
          div.className += ' div-vertical';
        }
        if (i!=0) {
          if (compareTimeBeforeAndThat(events[i-1], events[i]) 
            && events[i].timeFrom.split(':')[1] != '00'
            && checkOneOurInterval(events[i], timeFrom, timeTo)) {
              let a = +events[i - 1].timeFrom.split(':')[0];
              let b = +events[i].timeFrom.split(':')[0];
              b = b - a;
              let j = 0;
              while (j < b) {
                let block = document.createElement('div');
                block.style.minWidth = '175px';
                block.style.minHeight = '30px';
                td.append(block);
                j += 1;
              }
            }
        }
        td.append(div);
      }
    }
    tr.append(td);
    table.append(tr);
  }
  changeDateOnPage(date);
}

//compare time of end event before that event and time of start this event 
// and compare time of start event before that event and time of start this event
function compareTimeBeforeAndThat(eventBefore, thisEvent) {
  if (eventBefore.timeTo.split(':')[0] == thisEvent.timeFrom.split(':')[0]
      && eventBefore.timeFrom.split(':')[0] != thisEvent.timeFrom.split(':')[0]) {
    return true;
  }
  return false;
}

//check that time of event located between ONE hour interval
function checkOneOurInterval(event, timeFrom, timeTo) {
  if (getTimeInMin(event.timeFrom) >= getTimeInMin(timeFrom.format('kk:mm'))
      && getTimeInMin(event.timeTo) <= getTimeInMin(timeTo.format('kk:mm'))) {
    return true;
  }
  return false;
}
function getDateOnPage() {
  return moment(document.getElementById('date-on-page').textContent, 'DD MMMM YYYY');
}
export function showNextDay() {
  updatePage();
  createDayCalendar(document.getElementById('main-content'),getDateOnPage().add(1,'days'));
}
export function showPreviousDay() {
  updatePage();
  createDayCalendar(document.getElementById('main-content'),getDateOnPage().subtract(1,'days'));
}
function changeDateOnPage(date) {
  document.getElementById('date-on-page').innerHTML = '';
  let button = document.createElement('button');
  button.type = 'button';
  document.getElementById('date-on-page').appendChild(button);
  button.innerHTML = date.format('DD MMMM YYYY');
  button.id = 'datepicker';
}
