import light from './palettes/light';
import beige from './palettes/beige';
import mauve from './palettes/mauve';
import dim from './palettes/dim';
import dark from './palettes/dark';

import home1 from './palettes/home/home1';
import home2 from './palettes/home/home2';
import home3 from './palettes/home/home3';
import home4 from './palettes/home/home4';
import home5 from './palettes/home/home5';
import home6 from './palettes/home/home6';

const themes = {
  light,
  beige,
  mauve,
  dim,
  dark,
  //
  // home themes
  home1,
  home2,
  home3,
  home4,
  home5,
  home6
};

export function getTheme(theme) {
  return themes[theme];
}

export default getTheme;
