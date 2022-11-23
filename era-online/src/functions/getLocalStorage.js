import { constLocalStorage } from "../constants/localStorage";

// Get account data fromlocal storage
export const getLocalStorageAccount = () => {
  const account = window.localStorage.getItem(constLocalStorage.account);
  if (account !== null) {
    return JSON.parse(account);
  }
  return {};
};

// get profile data from localstorage
export const getLocalStorageProfile = () => {
  const profile = window.localStorage.getItem(constLocalStorage.profile);
  if (profile !== null) {
    return JSON.parse(profile);
  }
  return {};
};
