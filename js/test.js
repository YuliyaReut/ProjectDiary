import {getTimeInMin} from './generalScripts.js'
function test() {
  let array = [];
  let date1 = moment().format('YYYY-MM-DD');
  let date2 = moment().subtract(2,'days').format('YYYY-MM-DD');

  array[0] = {
    name: 'Meeting 1',
    description: '',
    date: date1,
    timeFrom: '10:30',
    timeTo: '11:30',
  };
  array[1] = {
    name: 'Meeting 3',
    description: '',
    date: date1,
    timeFrom: '11:40',
    timeTo: '12:45',
  };
  array[2] = {
    name: 'Meeting 3',
    description: '',
    date: date1,
    timeFrom: '14:05',
    timeTo: '14:15',
  };
  array[3] = {
    name: 'Meeting 2',
    description: '',
    date: date1,
    timeFrom: '14:25',
    timeTo: '14:30',
  };
  array[4] = {
    name: 'Meeting 4',
    description: '',
    date: date1,
    timeFrom: '17:00',
    timeTo: '19:00',
  };
  array[5] = {
    name: 'Meeting 5',
    description: '',
    date: date1,
    timeFrom: '20:10',
    timeTo: '21:00',
  };

  array[6] = {
    name: 'Meeting 2',
    description: '',
    date: date2,
    timeFrom: '10:40',
    timeTo: '10:45',
  };
  array[7] = {
    name: 'Meeting 3',
    description: '',
    date: date2,
    timeFrom: '10:45',
    timeTo: '10:50',
  };
  array[8] = {
    name: 'Meeting 4',
    description: '',
    date: date2,
    timeFrom: '10:50',
    timeTo: '11:00',
  };
  array[9] = {
    name: 'Meeting 5',
    description: '',
    date: date2,
    timeFrom: '13:00',
    timeTo: '17:20',
  };
  array[10] = {
    name: 'Meeting 8',
    description: '',
    date: date2,
    timeFrom: '18:15',
    timeTo: '18:20',
  };
  array[11] = {
    name: 'Meeting 9',
    description: '',
    date: date2,
    timeFrom: '18:20',
    timeTo: '18:25',
  };
  array[12] = {
    name: 'Meeting 10',
    description: '',
    date: date2,
    timeFrom: '18:25',
    timeTo: '18:30',
  };
  array[13] = {
    name: 'Meeting 11',
    description: '',
    date: date2,
    timeFrom: '18:30',
    timeTo: '18:35',
  };
  array[14] = {
    name: 'Meeting 12',
    description: '',
    date: date2,
    timeFrom: '19:40',
    timeTo: '19:50',
  };
  array[15] = {
    name: 'Meeting 13',
    description: '',
    date: date2,
    timeFrom: '20:00',
    timeTo: '20:50',
  };
  array[16] = {
    name: 'Meeting 14',
    description: '',
    date: date2,
    timeFrom: '20:55',
    timeTo: '21:00',
  };
  array[17] = {
    name: 'Meeting 15',
    description: '',
    date: date2,
    timeFrom: '21:15',
    timeTo: '21:20',
  };
  array[18] = {
    name: 'Meeting 16',
    description: '',
    date: date2,
    timeFrom: '21:25',
    timeTo: '21:30',
  };
  array[19] = {
    name: 'Meeting 17',
    description: '',
    date: date2,
    timeFrom: '21:30',
    timeTo: '21:40',
  };
  array[20] = {
    name: 'Meeting 18',
    description: '',
    date: date2,
    timeFrom: '21:45',
    timeTo: '21:50',
  };
  array[21] = {
    name: 'Meeting 19',
    description: '',
    date: date2,
    timeFrom: '21:50',
    timeTo: '22:00',
  };
  array[22] = {
    name: 'Meeting 20',
    description: '',
    date: date2,
    timeFrom: '22:00',
    timeTo: '22:10',
  };
  array[23] = {
    name: 'Meeting 21',
    description: '',
    date: date2,
    timeFrom: '22:20',
    timeTo: '22:40',
  };

  array[24] = {
    name: 'Meeting 28',
    description: '',
    date: date2,
    timeFrom: '22:40',
    timeTo: '22:50',
  };
  array[25] = {
    name: 'Meeting 9',
    description: '',
    date: date2,
    timeFrom: '23:30',
    timeTo: '23:35',
  };
  array[26] = {
    name: 'Meeting 10',
    description: '',
    date: date2,
    timeFrom: '23:35',
    timeTo: '23:40',
  };
  array[27] = {
    name: 'Meeting 11',
    description: '',
    date: date2,
    timeFrom: '23:40',
    timeTo: '23:55',
  };
  array[28] = {
    name: 'Meeting 12',
    description: '',
    date: date2,
    timeFrom: '23:55',
    timeTo: '24:00',
  };
  array[29] = {
    name: 'Meeting 17',
    description: '',
    date: date2,
    timeFrom: '8:30',
    timeTo: '8:40',
  };
  array[30] = {
    name: 'Meeting 18',
    description: '',
    date: date2,
    timeFrom: '8:45',
    timeTo: '8:50',
  };
  array[31] = {
    name: 'Meeting 19',
    description: '',
    date: date2,
    timeFrom: '9:50',
    timeTo: '10:00',
  };
  array[32] = {
    name: 'Meeting 20',
    description: '',
    date: date2,
    timeFrom: '9:00',
    timeTo: '9:10',
  };
  array[33] = {
    name: 'Meeting 21',
    description: '',
    date: date2,
    timeFrom: '10:20',
    timeTo: '10:40',
  };

  array[34] = {
    name: 'Meeting 28',
    description: '',
    date: date2,
    timeFrom: '10:10',
    timeTo: '10:20',
  };
  array[35] = {
    name: 'Meeting 9',
    description: '',
    date: date2,
    timeFrom: '11:30',
    timeTo: '11:35',
  };
  array[36] = {
    name: 'Meeting 10',
    description: '',
    date: date2,
    timeFrom: '11:35',
    timeTo: '11:40',
  };
  array[37] = {
    name: 'Meeting 11',
    description: '',
    date: date2,
    timeFrom: '11:40',
    timeTo: '11:55',
  };
  array[38] = {
    name: 'Meeting 12',
    description: '',
    date: date2,
    timeFrom: '11:55',
    timeTo: '12:00',
  };

  for (let i = 0; i < array.length; i++) {
    localStorage.setItem(array[i].date + '_' +array[i].name+'-'+array[i].timeFrom, JSON.stringify(array[i]));
  }
}
test();
