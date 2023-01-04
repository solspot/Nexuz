const genID = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4();
};

const componentToHex = (c) => {
  let hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
};

const rgbToHex = (color) => {
  let hex = '#' + componentToHex(color[0]) + componentToHex(color[1]) + componentToHex(color[2]);
  return hex;
};

const hexToRGB = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

const createShade = (color, x) => {
  let r = color[0] - x * 10 < 0 ? 0 : color[0] - x * 10;
  let g = color[1] - x * 10 < 0 ? 0 : color[1] - x * 10;
  let b = color[2] - x * 10 < 0 ? 0 : color[2] - x * 10;
  return [r, g, b];
};

const createTint = (color, x) => {
  let r = color[0] + x * 10 > 255 ? 255 : color[0] + x * 10;
  let g = color[1] + x * 10 > 255 ? 255 : color[1] + x * 10;
  let b = color[2] + x * 10 > 255 ? 255 : color[2] + x * 10;
  return [r, g, b];
};

const createTextOffset = (hex) => {
  let rgb = hexToRGB(hex);
  let offset;
  if (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 > 186) {
    // light background, dark text
    offset = '#000000';
  } else {
    offset = '#ffffff';
  }
  return offset;
};

const createOffset = (hex) => {
  let rgb = hexToRGB(hex);
  let offset;
  if (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 > 186) {
    // create shade
    offset = createShade(rgb, 1.5);
  } else {
    offset = createTint(rgb, 1.5);
  }
  return rgbToHex(offset);
};

/*
  Adds an ID to links in the link list, and also adds the account pubkey to the obj
*/
const formatProfileAccount = (_profile) => {
  try {
    let _links = [];
    let profile = decodeCustomization(_profile);
    // add id to all links
    profile.links.forEach((item) => {
      item.id = genID();
      _links.push({
        id: genID(),
        name: item.name,
        url: 'https://' + item.url.replace('https://', '')
      });
    });

    return { ...profile, links: _links };
  } catch (error) {
    return undefined;
  }
};

/*
  Adds an ID to links in the link list
*/
const formatProfileAccountDisplay = (account) => {
  try {
    let _links = [];
    let profile = decodeCustomization(account);

    // add id to all links
    profile.links.forEach((item) => {
      item.id = genID();
      _links.push(item);
    });

    return { ...profile, links: _links };
  } catch (error) {
    return undefined;
  }
};

/*
  Customize is a 3 digit value with each digit relating to 
  customizeable attributes like color, theme, or borders.
  customize[0:6] : accent color hex
  customize[7:13] : background color hex
  customize[14] : design pattern int
*/
const decodeCustomization = (profile) => {
  try {
    if (profile.styles === '') {
      profile = { ...profile, styles: '81bdc3fffbf80' };
    }

    let _accent, _background, _design, _offset, _palette;
    let customize = profile.styles;

    _accent = '#' + customize.slice(0, 6);

    _background = '#' + customize.slice(6, 12);
    _design = parseInt(customize.slice(12, 13));
    _offset = createOffset(_background);

    _palette = {
      accent: _accent,
      background: _background,
      offset: _offset,
      text: createTextOffset(_background),
      design: _design
    };

    return {
      ...profile,
      palette: _palette
    };
  } catch (error) {
    console.log(error);
    return false;
  }
};

const encodeCustomization = (profile) => {
  // styles: accent + background + design int
  let _accent = profile.palette.accent.replace('#', '');
  let _background = profile.palette.background.replace('#', '');
  let _design = profile.palette.design;

  let _styles = _accent + _background + _design.toString();
  return { ...profile, styles: _styles };
};

const formatProfileUpload = (profile) => {
  let _links = [];
  let _name, _url;
  profile = encodeCustomization(profile);

  // add id to all links
  profile.links.forEach((item) => {
    item.id = genID();
    _name = item.name;
    _url = item.url.replace('https://', '');
    _links.push({ name: _name, url: _url });
  });

  return { ...profile, links: _links };
};

const formatAddress = (address) => {
  if (!address) return '';
  let str = address.slice(0, 4) + '....' + address.slice(-4);
  return str;
};

// Capitalize the first letter of a word
const capitalize = (text) => {
  let capitalized = '';
  try {
    if (text.lenght === 1) {
      capitalized = text.charAt(0).toUpperCase();
    } else {
      capitalized = text.charAt(0).toUpperCase() + text.slice(1);
    }
  } catch (err) {
    capitalized = 'ERROR';
  }
  return capitalized;
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export {
  genID,
  formatProfileAccount,
  formatProfileAccountDisplay,
  decodeCustomization,
  formatProfileUpload,
  encodeCustomization,
  formatAddress,
  capitalize,
  createOffset,
  createTextOffset,
  sleep
};
