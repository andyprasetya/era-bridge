const baseURL = "";
const baseFolder = "api/";

export const apiURL = {
  // User
  login: baseURL + baseFolder + "user/login.php",
  signUp: baseURL + baseFolder + "user/sign-up.php",
  edit: baseURL + baseFolder + "user/edit.php",
  data: baseURL + baseFolder + "user/data.php",
  admin: baseURL + baseFolder + "user/admin.php",
  blocked: baseURL + baseFolder + "user/blocked.php",
  resendVerification: baseURL + baseFolder + "user/resend-verification.php",
  verification: baseURL + baseFolder + "user/verification.php",
  confirmPassword: baseURL + baseFolder + "user/confirm-password.php",
  resetPassword: baseURL + baseFolder + "user/reset-password.php",
  // Data
  uploadData: baseURL + baseFolder + "data/upload.php",
  listData: baseURL + baseFolder + "data/list.php",
  detailData: baseURL + baseFolder + "data/detail.php",
  statusData: baseURL + baseFolder + "data/status.php",
  dataLocation: baseURL + baseFolder + "data/",
};
