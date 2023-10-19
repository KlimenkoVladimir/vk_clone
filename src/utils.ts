export const colsList = (length: number) => {
  switch (length) {
    case 1:
      return 1;
    case 2 || 3 || 4:
      return 2;
    default:
      return 3;
  }
};

export function getCurrentTime() {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const formattedDate = `${day} ${months[month]} ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  return formattedDate;
}

// export const cols = (length: number, index: number) => {
//   switch (length) {
//     case 1:
//       return 1;
//     case 2 || 3 || 4:
//       return 2;
//     default:
//       return 3;
//   }
// };
