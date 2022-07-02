const getDateHelper = (data) => {
  const date = new Date(parseInt(data));

  const millisec = Date.now() - data;

  const minutes = (millisec / (1000 * 60)).toFixed(0);

  const hours = (millisec / (1000 * 60 * 60)).toFixed(0);

  const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(0);

  const year = millisec / (1000 * 60 * 60 * 24 * 30 * 12);

  if (+year < 1) {
    if (+days < 1) {
      if (+hours < 1) {
        if (+minutes <= 1) {
          return '1 минуту назад';
        } else if (+minutes <= 5) {
          return '5 минут назад';
        } else if (+minutes <= 10) {
          return '10 минут назад';
        } else if (+minutes <= 30) {
          return '30 минут назад';
        }
      } else {
        return `${date.getHours()}:${date.getMinutes()}`;
      }
    } else {
      return `${date.getDay()} ${date.toLocaleDateString('default', {
        month: 'long',
      })}`;
    }
  } else {
    return date.getFullYear() + '.' + (date.getMonth() + 1) + '_' + date.getDate();
  }
};

export default getDateHelper;
