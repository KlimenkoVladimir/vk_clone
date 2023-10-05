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
