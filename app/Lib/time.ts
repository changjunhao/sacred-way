export default function formatTime(val: number) {
  const nowTime = parseInt(String(new Date().getTime() / 1000), 10);
  val = nowTime - val;
  let time;
  if (val < 60) {
    time = '刚刚';
  } else if (val < 3600) {
    time = `${Math.ceil(val / 60)}分钟前`;
  } else if (val < 86400) {
    time = `${Math.ceil(val / 3600)}小时前`;
  } else if (val < 2592000) {
    const timeValue = Math.ceil(val / 3600 / 24);
    if (timeValue === 1) {
      time = '昨天';
    } else if (timeValue === 2) {
      time = '前天';
    } else {
      time = `${Math.ceil(val / 3600 / 24)}天前`;
    }
  } else if (val < 3110400) {
    time = `${Math.round(val / 3600 / 24 / 30)}月前`;
  } else {
    time = '一年前';
  }
  return time;
}
