export const getJSON = async function (url) {
  try {
    const res = await fetch(url);

    if (!res.status) throw new Error("Something went wrong! Try again later");

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export const getFormattedDay = function (timeStamp) {
  const dayNumber = new Date(timeStamp * 1000).getDay();

  const abbreviatedDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return abbreviatedDays[dayNumber];
};

export const getFormattedHours = function (timeStamp) {
  return `${String(new Date(timeStamp * 1000).getHours()).padStart(
    2,
    0
  )}:${String(new Date(timeStamp * 1000).getMinutes()).padStart(2, 0)}`;
};

export const getIconName = function (weather, timeStamp) {
  const nightHours = [0, 1, 2, 3, 4, 5];

  const atmosphereValues = [
    "mist",
    "smoke",
    "haze",
    "dust",
    "fog",
    "sand",
    "ash",
    "squall",
    "tornado",
  ];

  const lowercaseWeather = weather.toLowerCase();
  const hour = new Date(timeStamp * 1000).getHours();

  if (atmosphereValues.includes(lowercaseWeather)) return "mist";

  if (lowercaseWeather === "clear" && !nightHours.includes(hour))
    return "clearDay";

  if (lowercaseWeather === "clear" && nightHours.includes(hour))
    return "clearNight";

  return `${lowercaseWeather}`;
};
