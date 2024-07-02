import { isIOS } from './platformUtil';


export const fontFamilies = {
  MONTSERRAT: {
    normal: isIOS() ? 'Montserrat-Regular' : 'MontserratRegular',
    medium: isIOS() ? 'Montserrat-Medium' : 'MontserratMedium',
    bold: isIOS() ? 'Montserrat-Bold' : 'MontserratBold',
  },
  RUBIK: {
    normal: isIOS() ? 'Rubik-Regular' : 'RubikRegular',
    medium: isIOS() ? 'Rubik-Medium' : 'RubikMedium',
    bold: isIOS() ? 'Rubik-Bold' : 'RubikBold',
  },
};
