import { constParams } from "./formData";

// Routing Outside App
export const browserRouterList = {
  workshop: "electoral-redistricting-app://open",
  downloadApp: "/data/setup/ERA-Setup.zip",
  onlineAppVersion: "/online-app/",
  copyright: "https://www.idea.int/",
  aceProject: "https://aceproject.org/ace-en/topics/bd/default",
};

// Routing using hash for SPA
export const hashRouterList = {
  // Common
  home: "/",
  knowledgeHub: "/knowledge-hub",
  tutorial: "/tutorial",
  // User
  signIn: "/sign-in",
  signUp: "/sign-up",
  profile: "/profile",
  edit: "/edit",
  user: "/profile",
  admin: "/admin",
  // Info
  workshop: "/workshop",
  message: "/message",
  verification: "/verification",
  resetPassword: "/reset-password",
  // Library
  mapLibrary: "/map-library",
  viewData: "/view-data",
  uploadData: "/upload-data",
  // About
  about: "/about",
  privacyPolicy: "/privacy-policy",
  termsAndConditions: "/terms-and-conditions",
};

export const hashRouterHome = [
  hashRouterList.home,
  hashRouterList.knowledgeHub,
  hashRouterList.tutorial,
  // User
  hashRouterList.signIn,
  hashRouterList.signUp,
  hashRouterList.profile,
  hashRouterList.edit,
  hashRouterList.user + "/:" + constParams.id,
  hashRouterList.admin,
  // Library
  hashRouterList.mapLibrary,
  hashRouterList.viewData + "/:" + constParams.id,
  hashRouterList.uploadData,
];

export const hashRouterAbout = [
  hashRouterList.about,
  hashRouterList.privacyPolicy,
  hashRouterList.termsAndConditions,
];
