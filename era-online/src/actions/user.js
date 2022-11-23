import { apiURL } from "../constants/apiURL";
import { constLocalStorage } from "../constants/localStorage";
import { hashRouterList } from "../constants/routes";
import { getLocalStorageProfile } from "../functions/getLocalStorage";
import { accountData, keyForm, urlBody } from "./base";

export const isLogin = () => {
  if (window.localStorage.getItem(constLocalStorage.login) === "true") {
    return true;
  }
  return false;
};

export const isAdmin = () => {
  if (getLocalStorageProfile().admin === "1") {
    return true;
  }
  return false;
};

export const signIn = async (form) => {
  const body = urlBody() + keyForm(form);
  const response = await fetch(apiURL.login, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    cache: "no-cache",
    body: body,
  });
  const json = await response.json();
  return { status: response.status, json: json };
};

export const userProfile = async () => {
  let body = accountData();
  body += "type=PROFILE";

  const response = await fetch(apiURL.data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    cache: "no-cache",
    body: body,
  });
  const json = await response.json();
  return { status: response.status, json: json };
};

export const signUp = async (form) => {
  const body = urlBody() + keyForm(form);
  const response = await fetch(apiURL.signUp, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    cache: "no-cache",
    body: body,
  });
  const json = await response.json();
  return { status: response.status, json: json };
};

export const resendVerification = async (form) => {
  const body = urlBody() + keyForm(form);
  const response = await fetch(apiURL.resendVerification, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    cache: "no-cache",
    body: body,
  });
  const json = await response.json();
  return { status: response.status, json: json };
};

export const verification = async (form) => {
  const response = await fetch(apiURL.verification, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    cache: "no-cache",
    body: keyForm(form),
  });
  const json = await response.json();
  return { status: response.status, json: json };
};

export const confirmPassword = async (form) => {
  const body = accountData() + keyForm(form);

  const response = await fetch(apiURL.confirmPassword, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    cache: "no-cache",
    body: body,
  });
  const json = await response.json();
  return { status: response.status, json: json };
};

export const editProfileType = {
  data: "data",
  password: "password",
};

export const editProfile = async (form, type) => {
  let body = accountData() + keyForm(form);
  // type = "password" or "data"
  body += "type=" + type;

  const response = await fetch(apiURL.edit, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    cache: "no-cache",
    body: body,
  });
  const json = await response.json();
  return { status: response.status, json: json };
};

export const userData = async (userDataID) => {
  let body = accountData();
  body += "user_data_id=" + userDataID + "&";
  body += "type=USER";

  const response = await fetch(apiURL.data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    cache: "no-cache",
    body: body,
  });
  const json = await response.json();
  return { status: response.status, json: json };
};

export const resetPasswordType = {
  verification: "VERIFICATION",
  reset: "RESET",
};

export const resetPassword = async (form, type) => {
  const body =
    urlBody(hashRouterList.resetPassword) + keyForm(form) + "type=" + type;
  const response = await fetch(apiURL.resetPassword, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    cache: "no-cache",
    body: body,
  });
  const json = await response.json();
  return { status: response.status, json: json };
};

export const listUser = async () => {
  const response = await fetch(apiURL.admin, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    cache: "no-cache",
    body: accountData(),
  });
  const json = await response.json();
  return { status: response.status, json: json };
};

export const blocked = async (form) => {
  const body = accountData() + keyForm(form);
  const response = await fetch(apiURL.blocked, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    cache: "no-cache",
    body: body,
  });
  const json = await response.json();
  return { status: response.status, json: json };
};
