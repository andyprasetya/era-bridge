import {
  electoralDistrictLevelList,
  electoralSystemDesignList,
  organizationList,
  titleList,
  yesNoList,
} from "../constants/formData";
import { strLang } from "./language";
import CountryList from "../data/json/country.json";

export function validateRequired(data) {
  if (data.value.trim()) {
    return { passed: true, message: "" };
  }
  return {
    passed: false,
    message: data.label + " " + strLang.msg_is_required,
  };
}

export function validateEmail(data) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(String(data.value).toLowerCase())) {
    return { passed: true, message: "" };
  }
  return {
    passed: false,
    message: strLang.msg_input_email_address_correctly,
  };
}

export function validatePassword(data) {
  if (data.value.length >= 8) {
    return { passed: true, message: "" };
  }
  return {
    passed: false,
    message: strLang.msg_password_too_short,
  };
}

export function validateTitle(data) {
  if (titleList.includes(data.value)) {
    return { passed: true, message: "" };
  }
  return {
    passed: false,
    message: strLang.msg_choose_title,
  };
}

export function validateCountry(data) {
  for (let i = 0; i < CountryList.length; i++) {
    if (CountryList[i].ISO_A3 === data.value) {
      return { passed: true, message: "" };
    }
  }
  return {
    passed: false,
    message: strLang.msg_choose_country,
  };
}

export function validatePhoneNumber(data) {
  const phoneno = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g;
  if (data.value.match(phoneno)) {
    return { passed: true, message: "" };
  }
  return {
    passed: false,
    message: strLang.msg_input_phone_number_correctly,
  };
}

export function validateConfirmPassword(password, confirmPassword) {
  if (password.value === confirmPassword.value) {
    return { passed: true, message: "" };
  }
  return {
    passed: false,
    message: strLang.msg_password_didnt_match,
  };
}

export function validateYesNo(data) {
  if (yesNoList.includes(data.value)) {
    return { passed: true, message: "" };
  }
  return {
    passed: false,
    message: strLang.msg_choose_answer,
  };
}

export function validateOrganizationList(data) {
  if (organizationList.includes(data.value)) {
    return { passed: true, message: "" };
  }
  return {
    passed: false,
    message: strLang.msg_choose_answer,
  };
}

export function validateElectoralDistrictLevel(data) {
  if (electoralDistrictLevelList.includes(data.value)) {
    return { passed: true, message: "" };
  }
  return {
    passed: false,
    message: strLang.msg_choose_answer,
  };
}

export function validateElectoralSistemDesign(data) {
  if (electoralSystemDesignList.includes(data.value)) {
    return { passed: true, message: "" };
  }
  return {
    passed: false,
    message: strLang.msg_choose_answer,
  };
}

export function validateFileFormat(data) {
  if (data.value === "") {
    return { passed: true, message: "" };
  }
  const listFormat = data.fileFormat.split(",");
  for (let i = 0; i < listFormat.length; i++) {
    if (data.value.toLowerCase().endsWith(listFormat[i])) {
      return { passed: true, message: "" };
    }
  }
  return {
    passed: false,
    message: strLang.msg_wrong_file_format,
  };
}

// Keyname standar available in json offline app
const offlineJSONKeyName = {
  general: ["parliament_seats", "maximum_seats", "minimum_seats", "stddev"],
  feature: [
    "xareaname",
    "xarea_population",
    "xcalc_sq",
    "xcalc_round",
    "electoral_district",
  ],
};

export async function validateDataFromJSON(data) {
  if (data.value === "") {
    return { passed: true, message: "" };
  } else if (data.value.toLowerCase().endsWith(".json")) {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onloadend = (e) => {
        let isPassed = true;
        const fileJSON = JSON.parse(fileReader.result);
        offlineJSONKeyName.general.forEach((key) => {
          if (!fileJSON[key]) {
            isPassed = false;
          }
        });
        if (fileJSON.features) {
          fileJSON.features.forEach((feature) => {
            const props = feature.properties;
            offlineJSONKeyName.feature.forEach((key) => {
              if (!props[key]) {
                isPassed = false;
              }
            });
          });
        } else {
          isPassed = false;
        }
        if (isPassed) {
          resolve({ passed: true, message: "" });
        } else {
          resolve({
            passed: false,
            message: strLang.msg_wrong_file_format_json,
          });
        }
      };
      fileReader.readAsText(data.file);
    });
  } else {
    return { passed: true, message: "" };
  }
}
