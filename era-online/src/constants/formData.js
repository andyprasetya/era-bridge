import { strLang } from "../functions/language";
import {
  validateConfirmPassword,
  validateCountry,
  validateElectoralDistrictLevel,
  validateElectoralSistemDesign,
  validateEmail,
  validateFileFormat,
  validateOrganizationList,
  validatePassword,
  validateRequired,
  validateTitle,
  validateYesNo,
} from "../functions/validate";
import CountryList from "../data/json/country.json";

export const titleList = ["Mr.", "Mrs."];
export const yesNoList = ["No", "Yes"];
export const electoralDistrictLevelList = [
  "House of representative – national level",
  "Senate",
  "House of representative – provincial level",
  "House of representative – municipal level",
];
export const electoralSystemDesignList = [
  "Plurality Majority -	Single Member Districts",
  "Plurality Majority -	Multi Member Districts",
  "Proportional Representation",
  "Mixed -	Single Member Districts",
  "Mixed -	Multi Member Districts",
];
export const organizationList = [
  "Electoral Management Body",
  "Government Institution",
  "Civil Society Organization",
  "Research Institution",
  "University",
  "Political Party",
  "Others",
];

// Constant profile form
export const constFormData = {
  // Account Information
  email: {
    key: "email",
    label: strLang.input_email,
    default: "",
    value: "",
    rules: [validateRequired, validateEmail],
  },
  password: {
    key: "password",
    label: strLang.input_password,
    default: "",
    value: "",
    rules: [validateRequired, validatePassword],
  },
  confirm_password: {
    key: "confirm_password",
    label: strLang.input_confirm_password,
    default: "",
    value: "",
    rules: [validateRequired, validateConfirmPassword],
  },
  new_password: {
    key: "new_password",
    label: strLang.input_new_password,
    default: "",
    value: "",
    rules: [validateRequired, validatePassword],
  },
  confirm_new_password: {
    key: "confirm_new_password",
    label: strLang.input_confirm_new_password,
    default: "",
    value: "",
    rules: [validateRequired, validateConfirmPassword],
  },
  // Personal Information
  title: {
    key: "title",
    label: strLang.input_title,
    default: titleList[0],
    value: titleList[0],
    rules: [validateRequired, validateTitle],
  },
  first_name: {
    key: "first_name",
    label: strLang.input_first_name,
    default: "",
    value: "",
    rules: [validateRequired],
  },
  last_name: {
    key: "last_name",
    label: strLang.input_last_name,
    default: "",
    value: "",
    rules: [validateRequired],
  },
  // Institution Related Information
  institution_name: {
    key: "institution_name",
    label: strLang.input_institution_name,
    default: "",
    value: "",
    rules: [validateRequired],
  },
  department: {
    key: "department",
    label: strLang.input_department,
    default: "",
    value: "",
    rules: [validateRequired],
  },
  country: {
    key: "country",
    label: strLang.input_country,
    default: CountryList[0].ISO_A3,
    value: CountryList[0].ISO_A3,
    rules: [validateRequired, validateCountry],
  },
  expertise_field_of_issue: {
    key: "expertise_field_of_issue",
    label: strLang.input_expertise_field_of_issue,
    default: "",
    value: "",
    rules: [validateRequired],
  },
  institution_email: {
    key: "institution_email",
    label: strLang.input_institution_email,
    default: "",
    value: "",
    rules: [validateRequired, validateEmail],
  },
  // institution_phone_number: {
  //   key: "institution_phone_number",
  //   label: strLang.input_institution_phone_number,
  //   default: "",
  //   value: "",
  //   rules: [validateRequired, validatePhoneNumber],
  // },
};

// Constant data profile
export const constProfileData = {
  title: {
    key: "title",
    label: strLang.input_title,
    value: "",
  },
  first_name: {
    key: "first_name",
    label: strLang.input_first_name,
    value: "",
  },
  last_name: {
    key: "last_name",
    label: strLang.input_last_name,
    value: "",
  },
  institution_name: {
    key: "institution_name",
    label: strLang.input_institution_name,
    value: "",
    row: true,
  },
  department: {
    key: "department",
    label: strLang.input_department,
    value: "",
    row: true,
  },
  country: {
    key: "country",
    label: strLang.input_country,
    value: "",
    row: true,
  },
  expertise_field_of_issue: {
    key: "expertise_field_of_issue",
    label: strLang.input_expertise_field_of_issue,
    value: "",
    row: true,
  },
  institution_email: {
    key: "institution_email",
    label: strLang.input_institution_email,
    value: "",
    row: true,
  },
  // institution_phone_number: {
  //   key: "institution_phone_number",
  //   label: strLang.input_institution_phone_number,
  //   value: "",
  //   row: true,
  // },
  created_at: {
    key: "created_at",
    label: strLang.input_created_at,
    value: "",
    row: true,
  },
  updated_at: {
    key: "updated_at",
    label: strLang.input_updated_at,
    value: "",
  },
  last_sync: {
    key: "last_sync",
    label: strLang.input_last_sync,
    value: "",
  },
};

export const getCountry = (val) => {
  for (let i = 0; i < CountryList.length; i++) {
    if (CountryList[i].ISO_A3 === val) {
      return CountryList[i].NAME;
    }
  }
  return val;
};

export const constParams = {
  id: "id",
  email: "email",
  token: "token",
};

export const constOtherKey = {
  no: "no",
  userID: "user_id",
  dataID: "data_id",
  admin: "admin",
  viewProfile: "view_profile",
  viewData: "view_data",
  blocked: "blocked",
  blockedItem: "blocked_item",
  verified: "verified",
  userDataID: "user_data_id",
  userDataBlocked: "user_data_blocked",
  status: "status",
  statusChange: "status_change",
  fullName: "full_name",
};

export const constDataStatus = {
  pending: "Pending",
  verified: "Verified",
  reject: "Reject",
  delete: "Delete",
};

export const constDataStatusArr = [
  constDataStatus.pending,
  constDataStatus.verified,
  constDataStatus.reject,
  constDataStatus.delete,
];

export const cloneObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const constFormDataERAType = [
  {
    label: "Geospatial Data (.json)",
    format: [".json"],
  },
  {
    label: "Document (.pdf)",
    format: [".pdf"],
  },
  {
    label: "Image (.png .jpg)",
    format: [".png", ".jpg", ".jpeg", ".bmp", ".gif", ".svg"],
  },
];

export const constFormDataERA = {
  // Redistricting App Data Information
  title: {
    key: "title",
    label: "Title",
    default: "",
    value: "",
    rules: [validateRequired],
  },
  description: {
    key: "description",
    label: "Description",
    default: "",
    value: "",
    rules: [validateRequired],
  },
  spatial_data: {
    key: "spatial_data",
    label: "Upload Data",
    default: "",
    value: "",
    fileFormat: constFormDataERAType[0].format[0],
    rules: [validateRequired, validateFileFormat],
  },
  country: {
    key: "country",
    label: "Country",
    default: CountryList[0].ISO_A3,
    value: CountryList[0].ISO_A3,
    rules: [validateRequired, validateCountry],
  },
  organization: {
    key: "organization",
    label: "Organization",
    default: CountryList[0].ISO_A3,
    value: CountryList[0].ISO_A3,
    rules: [validateRequired, validateOrganizationList],
  },
  population_data_source: {
    key: "population_data_source",
    label: "Source of population data :",
    default: "",
    value: "",
    rules: [validateRequired],
  },
  // population_data_available_online: {
  //   key: "population_data_available_online",
  //   label: "Is the population data available online?",
  //   default: yesNoList[0],
  //   value: yesNoList[0],
  //   rules: [validateRequired, validateYesNo],
  // },
  population_data_publish_permission: {
    key: "population_data_publish_permission",
    label: "Does the population data require permission to use and publish?",
    default: yesNoList[0],
    value: yesNoList[0],
    rules: [validateRequired, validateYesNo],
  },
  spatial_data_source: {
    key: "spatial_data_source",
    label: "Source of spatial data:",
    default: "",
    value: "",
    rules: [validateRequired],
  },
  // spatial_data_available_online: {
  //   key: "spatial_data_available_online",
  //   label: "Is the spatial data available online?",
  //   default: yesNoList[0],
  //   value: yesNoList[0],
  //   rules: [validateRequired, validateYesNo],
  // },
  spatial_data_publish_permission: {
    key: "spatial_data_publish_permission",
    label: "Does the spatial data require permission to use and publish?",
    default: yesNoList[0],
    value: yesNoList[0],
    rules: [validateRequired, validateYesNo],
  },
  copyright_holder: {
    key: "copyright_holder",
    label:
      "Any data containing material subject to copyright restrictions other than those owned or controlled by the contributor must be accompanied by appropriate permissions from the relevant copyright holder(s). If not provided, users are responsible for any consequences derived from the absence.\nUpload the letter of permissions from the relevant copyright holder:",
    default: "",
    value: "",
    display: false,
    fileFormat: ".pdf",
    rules: [validateFileFormat],
  },
  electoral_district_level: {
    key: "electoral_district_level",
    label: "Parliament Type:",
    default: electoralDistrictLevelList[0],
    value: electoralDistrictLevelList[0],
    rules: [validateRequired, validateElectoralDistrictLevel],
  },
  electoral_system_design: {
    key: "electoral_system_design",
    label: "Electoral System:",
    default: electoralSystemDesignList[0],
    value: electoralSystemDesignList[0],
    rules: [validateRequired, validateElectoralSistemDesign],
  },
  minimum_seat_allocation: {
    key: "minimum_seat_allocation",
    label:
      "Minimum seat allocation to district that regulated on election law?",
    default: "",
    value: "",
    rules: [],
  },
  maximum_seat_allocation: {
    key: "maximum_seat_allocation",
    label:
      "Maximum seat allocation to district that regulated on election law?",
    default: "",
    value: "",
    rules: [],
  },
  standard_allowable_opovov: {
    key: "standard_allowable_opovov",
    label:
      "Is there any standard allowable of deviation from one person one vote one value (OPOVOV) that can be tolerated to in allocate delimiting the seat at electoral districts on election law? If yes state the percentage:",
    default: "",
    value: "",
    rules: [],
  },
  electoral_district_drawing_responsibility: {
    key: "electoral_district_drawing_responsibility",
    label: "Who is responsible to drawing electoral district in your country:",
    default: "",
    value: "",
    rules: [],
  },
  electoral_district_frequency: {
    key: "electoral_district_frequency",
    label:
      "Time interval or frequency to change or renew electoral district in election:",
    default: "",
    value: "",
    rules: [],
  },
  electoral_district_for_minority: {
    key: "electoral_district_for_minority",
    label:
      "Is there special provisions for minority groups when delimiting electoral districts:",
    default: yesNoList[0],
    value: yesNoList[0],
    rules: [validateRequired, validateYesNo],
  },
};
