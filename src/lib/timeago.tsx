export function timeAgo(timestamp: any) {
  const dateTimestamp: any = new Date(timestamp);
  const currentTime: any = new Date();
  const seconds = Math.floor((currentTime - dateTimestamp) / 1000);
  const intervals: any = {
    year: seconds / 31536000,
    month: seconds / 2592000,
    week: seconds / 604800,
    day: seconds / 86400,
    hour: seconds / 3600,
    minute: seconds / 60,
  };

  let unit, value;
  for (unit in intervals) {
    value = Math.floor(intervals[unit]);
    if (value >= 1) {
      return `${value} ${unit}${value !== 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
}
