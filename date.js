module.exports.getDate = function () {
  const today = new Date();
  const currentDay = today.getDay();
  let day  = today.toLocaleDateString('en-US', { weekday: 'long' });;

  return day;
}

module.exports.getDay = function () {
  const today = new Date();
  const currentDay = today.getDay();
  let day  = today.toLocaleDateString('en-US',
    { weekday: 'long',
      day: "numeric",
      month: "long"
    });;

  return day;
}
