import { constLocalStorage } from "../constants/localStorage";

// Get language setting from localstorage
const getLanguageCode = () => {
  const language = window.localStorage.getItem(constLocalStorage.language);
  if (language !== null) {
    return language;
  }
  return "en";
};

// Get language json from file by using language setting in localstorage
const getLanguageJSON = () => {
  const language = getLanguageCode();
  const defaultLang = require(`../string/en.json`);
  try {
    const strObj = {};
    const choosenLang = require(`../string/${language}.json`);

    // Re-map Language if some language not yet translated
    for (const key in defaultLang) {
      if (defaultLang.hasOwnProperty(key)) {
        if (choosenLang.hasOwnProperty(key)) {
          strObj[key] = choosenLang[key];
        } else {
          strObj[key] = defaultLang[key];
        }
      }
    }
    return strObj;
  } catch (er) {
    return defaultLang;
  }
};

// Export the json string language
export const strLang = getLanguageJSON();
