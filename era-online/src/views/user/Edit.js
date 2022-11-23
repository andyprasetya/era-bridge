import React from "react";
import { useHistory } from "react-router-dom";
import { strLang } from "../../functions/language";
import { hashRouterList } from "../../constants/routes";
import MarginSpace from "../../components/Margin";
import { editProfile, editProfileType, isLogin } from "../../actions/user";
import { validateConfirmPassword } from "../../functions/validate";
import { constFormData, titleList } from "../../constants/formData";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import CountryList from "../../data/json/country.json";
import { getLocalStorageProfile } from "../../functions/getLocalStorage";
import PasswordButton from "../../components/PasswordButton";
import { constLocalStorage } from "../../constants/localStorage";

const editPasswordFormInitialState = {
  // Account Information
  [constFormData.new_password.key]: { ...constFormData.new_password },
  [constFormData.confirm_new_password.key]: {
    ...constFormData.confirm_new_password,
  },
};

const editProfileFormInitialState = {
  // Personal Information
  [constFormData.title.key]: { ...constFormData.title },
  [constFormData.first_name.key]: { ...constFormData.first_name },
  [constFormData.last_name.key]: { ...constFormData.last_name },
  // Institution Related Information
  [constFormData.institution_name.key]: { ...constFormData.institution_name },
  [constFormData.department.key]: { ...constFormData.department },
  [constFormData.country.key]: { ...constFormData.country },
  [constFormData.expertise_field_of_issue.key]: {
    ...constFormData.expertise_field_of_issue,
  },
  [constFormData.institution_email.key]: { ...constFormData.institution_email },
  // [constFormData.institution_phone_number.key]: {
  //   ...constFormData.institution_phone_number,
  // },
};

function Required() {
  return <span className="text-red-700 px-1">*</span>;
}

function EditProfileContent({ data }) {
  const history = useHistory();
  const [formData, setFormData] = React.useState({ ...data });
  const [errorMessage, setErrorMessage] = React.useState([]);

  const handleInputChange = (e) => {
    const message = [];
    const eForm = formData[e.target.name];
    eForm.value = e.target.value;
    eForm.rules.forEach((rule) => {
      const validated = rule(eForm);
      if (!validated.passed) {
        message.push(validated.message);
      }
    });
    setErrorMessage(message);
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: eForm,
      };
    });
  };

  const handleUpdateProfile = async () => {
    // Check form validation
    const message = [];
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const eForm = formData[key];
        eForm.rules.forEach((rule) => {
          const validated = rule(eForm);
          if (!validated.passed) {
            message.push(validated.message);
          }
        });
      }
    }
    setErrorMessage(message);
    if (message.length === 0) {
      const response = await editProfile(formData, editProfileType.data);
      if (response.status === 200) {
        alert(response.json.message);
        history.push(hashRouterList.profile);
        window.location.reload();
      } else {
        // show error message
        setErrorMessage([response.json.message]);
      }
    }
  };

  return (
    <>
      <div className="text-black">
        <h1 className="text-3xl font-bold mb-2">{strLang.edit_profile}</h1>
        <div className="border-b border-primary-orange mt-4 mb-8" />
        {/* Personal Information */}
        <div className="mb-8">
          <h6 className="text-large mt-3 mb-4 font-semibold bg-gray-100">
            {strLang.input_personal_information}
          </h6>
          <div className="space-y-4">
            <div>
              <label className="text-gray-700">
                {formData.title.label}
                <Required />
              </label>
              <select
                name={formData.title.key}
                value={formData.title.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              >
                {titleList.map((title, idx) => (
                  <option key={idx}>{title}</option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="text-gray-700">
                {formData.first_name.label}
                <Required />
              </label>
              <input
                type="text"
                name={formData.first_name.key}
                value={formData.first_name.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="w-full">
              <label className="text-gray-700">
                {formData.last_name.label}
                <Required />
              </label>
              <input
                type="text"
                name={formData.last_name.key}
                value={formData.last_name.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
        </div>
        {/* Institute Information */}
        <div className="mb-8">
          <h6 className="text-large mt-3 mb-4 font-semibold bg-gray-100">
            {strLang.input_institution_related_information}
          </h6>
          <div className="space-y-4">
            <div className="w-full">
              <label className="text-gray-700">
                {formData.institution_name.label}
                <Required />
              </label>
              <input
                type="text"
                name={formData.institution_name.key}
                value={formData.institution_name.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="w-full">
              <label className="text-gray-700">
                {formData.department.label}
                <Required />
              </label>
              <input
                type="text"
                name={formData.department.key}
                value={formData.department.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <label className="text-gray-700">
                {formData.country.label}
                <Required />
              </label>
              <select
                name={formData.country.key}
                value={formData.country.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              >
                {CountryList.map((country, idx) => (
                  <option key={idx} value={country.ISO_A3}>
                    {country.NAME}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="text-gray-700">
                {formData.expertise_field_of_issue.label}
                <Required />
              </label>
              <input
                type="text"
                name={formData.expertise_field_of_issue.key}
                value={formData.expertise_field_of_issue.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="w-full">
              <label className="text-gray-700">
                {formData.institution_email.label}
                <Required />
              </label>
              <input
                type="text"
                autoComplete="false"
                name={formData.institution_email.key}
                value={formData.institution_email.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            {/* <div className="w-full">
              <label className="text-gray-700">
                {formData.institution_phone_number.label}
                <Required />
              </label>
              <input
                type="number"
                placeholder="+00"
                name={formData.institution_phone_number.key}
                value={formData.institution_phone_number.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
            </div> */}
          </div>
        </div>
        {/* Error Message */}
        <div className="max-w-sm mx-auto">
          <p className="text-center text-sm font-light text-red-700 whitespace-pre-line">
            {errorMessage.join("\r\n")}
          </p>
        </div>
        <div className="text-center mt-3">
          <PasswordButton handleFunction={handleUpdateProfile} />
        </div>
      </div>
    </>
  );
}

function EditPasswordContent() {
  const history = useHistory();
  const [formData, setFormData] = React.useState({
    ...editPasswordFormInitialState,
  });
  const [errorMessage, setErrorMessage] = React.useState([]);

  const handleInputChange = (e) => {
    const message = [];
    const eForm = formData[e.target.name];
    eForm.value = e.target.value;
    eForm.rules.forEach((rule) => {
      if (rule === validateConfirmPassword) {
        const validated = rule(formData[constFormData.new_password.key], eForm);
        if (!validated.passed) {
          message.push(validated.message);
        }
        return;
      }
      const validated = rule(eForm);
      if (!validated.passed) {
        message.push(validated.message);
      }
    });
    setErrorMessage(message);
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: eForm,
      };
    });
  };

  const handleChangePassword = async () => {
    // Check form validation
    const message = [];
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const eForm = formData[key];
        eForm.rules.forEach((rule) => {
          if (rule === validateConfirmPassword) {
            const validated = rule(
              formData[constFormData.new_password.key],
              eForm
            );
            if (!validated.passed) {
              message.push(validated.message);
            }
            return;
          }
          const validated = rule(eForm);
          if (!validated.passed) {
            message.push(validated.message);
          }
        });
      }
    }
    setErrorMessage(message);
    if (message.length === 0) {
      const response = await editProfile(formData, editProfileType.password);
      if (response.status === 200) {
        // save data to localstorage
        localStorage.setItem(
          constLocalStorage.account,
          JSON.stringify(response.json.data)
        );
        alert(response.json.message);
        history.push(hashRouterList.profile);
        window.location.reload();
      } else {
        // show error message
        setErrorMessage([response.json.message]);
      }
    }
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="text-black">
        <h1 className="text-3xl font-bold mb-2">{strLang.edit_password}</h1>
        <div className="border-b border-primary-orange mt-4 mb-8" />
        {/* Account Information */}
        <div className="mb-8">
          <h6 className="text-large mt-3 mb-4 font-semibold bg-gray-100">
            {strLang.input_account_information}
          </h6>
          <div className="space-y-4">
            <div className="w-full">
              <label className="text-gray-700">
                {constFormData.email.label}
              </label>
              <input
                type="email"
                disabled={true}
                name={constFormData.email.key}
                value={getLocalStorageProfile().email}
                className="block text-base py-3 px-4 w-full border outline-none"
              />
            </div>
            <div className="relative">
              <label className="text-gray-700">
                {formData.new_password.label}
                <Required />
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name={formData.new_password.key}
                value={formData.new_password.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
              {showPassword ? (
                <EyeIcon
                  className="cursor-pointer w-5 h-5 absolute bottom-3 right-3 text-gray-500"
                  onClick={handleShowPassword}
                />
              ) : (
                <EyeOffIcon
                  className="cursor-pointer w-5 h-5 absolute bottom-3 right-3 text-gray-500"
                  onClick={handleShowPassword}
                />
              )}
            </div>
            <div className="relative">
              <label className="text-gray-700">
                {formData.confirm_new_password.label}
                <Required />
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name={formData.confirm_new_password.key}
                value={formData.confirm_new_password.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
              {showPassword ? (
                <EyeIcon
                  className="cursor-pointer w-5 h-5 absolute bottom-3 right-3 text-gray-500"
                  onClick={handleShowPassword}
                />
              ) : (
                <EyeOffIcon
                  className="cursor-pointer w-5 h-5 absolute bottom-3 right-3 text-gray-500"
                  onClick={handleShowPassword}
                />
              )}
            </div>
          </div>
        </div>
        {/* Error Message */}
        <div className="max-w-sm mx-auto">
          <p className="text-center text-sm font-light text-red-700 whitespace-pre-line">
            {errorMessage.join("\r\n")}
          </p>
        </div>
        <div className="text-center mt-3">
          <PasswordButton handleFunction={handleChangePassword} />
        </div>
      </div>
    </>
  );
}

// Edit Page
export default function Edit() {
  const history = useHistory();
  const [editProfileFormData, setEditProfileFormData] = React.useState({
    ...editProfileFormInitialState,
  });
  // Scroll to top on first load
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isLogin()) {
      history.push(hashRouterList.signIn);
    }
  }, [history]);

  React.useEffect(() => {
    const localProfile = getLocalStorageProfile();

    // Inserting value to profile data
    function insertingProfileValue(tempData) {
      const eFormData = editProfileFormData;
      for (const key in eFormData) {
        if (eFormData.hasOwnProperty(key)) {
          eFormData[key].value = tempData[key];
        }
      }
      setEditProfileFormData(eFormData);
    }
    insertingProfileValue(localProfile);
  }, [editProfileFormData]);

  return (
    <div className="bg-primary-grayLight h-full py-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white shadow-md p-8 mx-8">
          <EditProfileContent data={editProfileFormData} />
        </div>
      </div>
      <div className="max-w-xl mx-auto mt-4">
        <div className="bg-white shadow-md p-8 mx-8">
          <EditPasswordContent />
        </div>
      </div>
      <MarginSpace />
    </div>
  );
}
