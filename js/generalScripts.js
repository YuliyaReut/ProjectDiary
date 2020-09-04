export let dayOfWeek = ['Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday'];

export function createBlockEvent(elem, obj) {
  let div = document.createElement('div');
  div.innerHTML = obj.name + ' ' + obj.timeFrom + '-' + obj.timeTo;
  div.className = 'block-event-in-table-month-' + randomInteger(1,3) + ' block-event-in-table-month';
  elem.append(div);
}

export function getArrayEvents(date) {
  let array = [];
  let j = 0;
  for (let i=0; i < window.localStorage.length; i++) {
    let key = window.localStorage.key(i);
    let obj = JSON.parse(window.localStorage.getItem(key));
    if (obj.date == date.format('YYYY-MM-DD')) {
      array[j] = obj;
      j++;
    }
  }
  array.sort((a,b) => getTimeInMin(a.timeFrom) > getTimeInMin(b.timeFrom) ? 1 : -1);
  return array;
}

export function randomInteger(min,max) {
  let r = min + Math.random() * (max + 1 - min);
  return Math.floor(r);
}

//update page after changes
export function updatePage() {
  let mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '';
}

export function getTimeInMin(time) {
  time = time.split(':');
  return +time[0]*60 + +time[1];
}
