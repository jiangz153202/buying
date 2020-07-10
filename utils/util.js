const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const sampleFormatTime =  (time) => {
    if (!time) return '';

    var date = getDate(time);
    var M = date.getMonth() + 1;
    var y = date.getFullYear();
    var d = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    if (M < 10) M = "0" + M;
    if (d < 10) d = "0" + d;
    if (h < 10) h = "0" + h;
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
}


module.exports = {
  formatTime: formatTime,
  sampleFormatTime:sampleFormatTime
}
