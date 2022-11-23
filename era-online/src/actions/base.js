import { hashRouterList } from "../constants/routes";
import { getLocalStorageAccount } from "../functions/getLocalStorage";

export const keyForm = (form) => {
  let body = "";
  for (const key in form) {
    if (form.hasOwnProperty(key)) {
      body += key + "=" + form[key].value + "&";
    }
  }
  return body;
};

export const accountData = () => {
  const accountData = getLocalStorageAccount();
  let body = "";
  body += "user_id=" + accountData.user_id + "&";
  body += "email=" + accountData.email + "&";
  body += "token=" + accountData.hash + "&";
  return body;
};

export const urlBody = (route = hashRouterList.verification) => {
  const url = window.location.href;
  const baseUrl = url.substring(0, url.lastIndexOf("/"));
  const body = "url=" + baseUrl + route + "&";
  return body;
};
