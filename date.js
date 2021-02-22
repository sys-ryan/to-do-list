function getDate() {
  const today = new Date();
  const currentDay = today.getDay();
  let day  = today.toLocaleDateString('en-US', { weekday: 'long' });;

  return day;
}

module.exports = getDate;
