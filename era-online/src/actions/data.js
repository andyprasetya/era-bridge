import { apiURL } from "../constants/apiURL";
import { hashRouterList } from "../constants/routes";
import { getLocalStorageAccount } from "../functions/getLocalStorage";
import { strLang } from "../functions/language";
import { validateDataFromJSON } from "../functions/validate";
import { accountData, keyForm } from "./base";

export const uploadData = async (form) => {
  const accountData = getLocalStorageAccount();
  const url = window.location.href;
  const baseUrl =
    url.substring(0, url.lastIndexOf("/")) + hashRouterList.viewData;

  const data = new FormData();
  data.append("url", baseUrl);
  data.append("user_id", accountData.user_id);
  data.append("email", accountData.email);
  data.append("token", accountData.hash);

  for (const key in form) {
    if (form.hasOwnProperty(key)) {
      if (form[key].fileFormat) {
        const msgValidate = await validateDataFromJSON(form[key]);
        if (!msgValidate.passed) {
          return {
            status: 400,
            json: { message: strLang.msg_wrong_file_format_json },
          };
        }
        data.append(key, form[key].file);
      } else {
        data.append(key, form[key].value);
      }
    }
  }
  const response = await fetch(apiURL.uploadData, {
    method: "POST",
    cache: "no-cache",
    body: data,
  });
  const json = await response.json();
  return { status: response.status, json: json };
};

export const listData = async (userDataID) => {
  let body = accountData();
  body += "user_data_id=" + userDataID + "&";
  body += "type=USER";
  const response = await fetch(apiURL.listData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    cache: "no-cache",
    body: body,
  });
  const json = await response.json();
  return { status: response.status, json: json };
};

export const listDataAdmin = async () => {
  let body = accountData();
  body += "type=ADMIN";
  const response = await fetch(apiURL.listData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    cache: "no-cache",
    body: body,
  });
  const json = await response.json();
  return { status: response.status, json: json };
};

export const listDataPublic = async () => {
  const response = await fetch(apiURL.listData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    cache: "no-cache",
  });
  const json = await response.json();
  return { status: response.status, json: json };
};

export const detailData = async (mapDataID) => {
  const body = accountData() + "data_id=" + mapDataID;
  const response = await fetch(apiURL.detailData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    cache: "no-cache",
    body: body,
  });
  const json = await response.json();
  return { status: response.status, json: json };
};

export const statusData = async (form) => {
  const body = accountData() + keyForm(form);
  const response = await fetch(apiURL.statusData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    cache: "no-cache",
    body: body,
  });
  const json = await response.json();
  return { status: response.status, json: json };
};
