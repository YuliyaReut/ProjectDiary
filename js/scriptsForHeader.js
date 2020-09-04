export let date = moment();
export let sign = 0;
export let panel;
export let activeMonth=true, activeWeek=false, activeDay=false;
export let months = ['January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'];

import {createCalendar, showNextMonth, showPreviousMonth} from './scriptsForMonthPage.js';
import {createWeekCalendar , showNextWeek, showPreviousWeek, dateOnPage} from './scriptsForWeekPage.js';
import {createDayCalendar, showNextDay, showPreviousDay } from './scriptsForDayPage.js';
import {addNewEvent} from './scriptsForFormNewEvent.js'
import {createBlockEvent, getArrayEvents, updatePage} from './generalScripts.js'

createCalendar(document.getElementById('main-content'), date);
showTemperature();
//events when clicking on buttons in the header
document.getElementById('new-event').addEventListener('click',() => { addNewEvent(); });
document.getElementById('next-button').addEventListener('click', () => {
  if (activeMonth) {
    showNextMonth();
  } else
    if (activeWeek) {
      showNextWeek();
    } else
        showNextDay();
});
document.getElementById('previous-button').addEventListener('click', () => {
  if (activeMonth) {
    showPreviousMonth();
  } else
    if (activeWeek) {
      showPreviousWeek();
    } else
        showPreviousDay();
});
document.getElementById('date-on-page').addEventListener('click', () => { handleSelector(); 
});
document.getElementById('button-month').addEventListener('click', () => {
  updatePage();
  createCalendar(document.getElementById('main-content'), moment());
  activeMonth = true;
  activeDay = false;
  activeWeek = false;
});
document.getElementById('button-week').addEventListener('click', () => {
  updatePage();
  createWeekCalendar(document.getElementById('main-content'), moment());
  activeMonth = false;
  activeDay = false;
  activeWeek = true;
});
document.getElementById('button-day').addEventListener('click', () => {
  updatePage();
  createDayCalendar(document.getElementById('main-content'), moment());
  activeMonth = false;
  activeDay = true;
  activeWeek = false;
});


function handleSelector() {
  if (sign) {
    sign = 0;
    panel.innerHTML = '';
    panel.style.display = 'none';
  } else {
      panel = document.getElementById('month-selector');
      let buttonToday = createPanelSelectors(panel);
      if (activeMonth) {
        buttonToday.onclick = function() {
          updatePage();
          createCalendar(document.getElementById('main-content'),moment());
        }
        showMonthSelector();
      } else
          if (activeWeek){
            buttonToday.onclick = function() {
              updatePage();
              createWeekCalendar(document.getElementById('main-content'), moment());
            }
            showWeekSelector();
          } else if (activeDay) {
              let data = document.getElementById('datepicker');
              pickmeup(data,{
              	format	: 'Y-m-d',
              });
              data.addEventListener('pickmeup-change', function (e) {
                  updatePage();
                  createDayCalendar(document.getElementById('main-content'),moment(e.detail.formatted_date, 'YYYY-MM-DD'));
              });
              panel.innerHTML = '';
          }
    }
}

function createPanelSelectors(panel) {
  let buttonToday = document.createElement('button');
  let divButton = document.createElement('div');
  panel.append(divButton);
  divButton.append(buttonToday);
  buttonToday.innerHTML = 'Today';
  buttonToday.className = 'buttonToday';
  return buttonToday;
}


function showMonthSelector() {
  let divTable = document.createElement('div');
  panel.append(divTable);
  let tableOfMonths = document.createElement('table');
  divTable.append(tableOfMonths);

  for (let i = 0; i < 6; i++) {    //create 2 columns with months
    let tableLine = document.createElement('tr');
    tableOfMonths.appendChild(tableLine);
    let cellLeft = document.createElement('td');
    let cellRight = document.createElement('td');
    tableLine.append(cellLeft);
    tableLine.append(cellRight);
    cellLeft.innerHTML = months[i];
    cellLeft.onclick = function() {
      updatePage();
      createCalendar(document.getElementById('main-content'),moment(i+1,'M'));
    };
    cellRight.innerHTML = months[i+6];
    cellRight.onclick = function() {
      updatePage();
      createCalendar(document.getElementById('main-content'),moment(i+7,'M'));
    };
  }
  panel.style.display = 'block';
  sign = 1;
}

function showWeekSelector() {
    let divTable = document.createElement('div');
    panel.append(divTable);
    let tableOfWeeks = document.createElement('table');
    divTable.append(tableOfWeeks);
    let tr = document.createElement('tr');
    tableOfWeeks.append(tr);
    let td = document.createElement('td');
    let startMonth = moment (dateOnPage.format('YYYY MM') + ' 01', 'YYYY MM DD');
    startMonth.subtract(startMonth.isoWeekday()-1,'days');
    if (dateOnPage.format('MM') == startMonth.format('MM')) { //if month starts from monday
      createWeekSelector(tableOfWeeks, 1, startMonth);
    } else {
        createWeekSelector(tableOfWeeks, 2, startMonth);
    }
    panel.style.display = 'block';
    sign = 1;
}
function createWeekSelector(tableOfWeeks, i, startMonth) {
  let monthEnd = moment(startMonth.format('YYYY-MM-DD'));
  monthEnd.add(i,'months');
  while (startMonth.format('MM') < monthEnd.format('MM')) { // where b+1 -> next month
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let monthNow = moment(startMonth);
    td.addEventListener('click', () => {
      updatePage();
      createWeekCalendar(document.getElementById('main-content'), monthNow);
    });
    td.innerHTML = startMonth.format('DD.MM.YYYY') + ' - ' + startMonth.add(6,'days').format('DD.MM.YYYY');
    startMonth.add(1,'days');
    tr.append(td);
    tableOfWeeks.append(tr);
  }
}

async function showTemperature() {
  let url = 'http://api.openweathermap.org/data/2.5/weather?id=627907&appid=2c07b5764d79a7d0b84306ca5f273868';
  let response = await fetch(url);
  if (response.ok) {
    let json = await response.json();
    let temp = +json.main.temp;
    document.getElementById('temperature').innerHTML = 'Weather in Gomel - ' + (+temp - 273.15) + '&deg;';
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}
