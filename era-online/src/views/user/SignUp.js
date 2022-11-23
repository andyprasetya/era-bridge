import React from "react";
import { Link as LinkRouter, useHistory } from "react-router-dom";
import { strLang } from "../../functions/language";
import { hashRouterList } from "../../constants/routes";
import { BTNSolid } from "../../components/Button";
import MarginSpace from "../../components/Margin";
import { constFormData, titleList } from "../../constants/formData";
import { isLogin, resendVerification, signUp } from "../../actions/user";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { validateConfirmPassword } from "../../functions/validate";
import CountryList from "../../data/json/country.json";
import success from "../../images/success.png";

const signUpFormInitialState = {
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
  // Account Information
  [constFormData.email.key]: { ...constFormData.email },
  [constFormData.password.key]: { ...constFormData.password },
  [constFormData.confirm_password.key]: { ...constFormData.confirm_password },
};

// Message content if creating account success
function MessageContent({ response, formData }) {
  const [btnResend, setBtnResend] = React.useState(strLang.btn_resend);
  const [message, setMessage] = React.useState(response.json.message);
  async function resendVerif() {
    setBtnResend("");
    const res = await resendVerification({
      [constFormData.email.key]: formData.email,
      [constFormData.password.key]: formData.password,
    });
    if (res) {
      setMessage(res.json.message);
      setTimeout(() => setBtnResend(strLang.btn_resend), 60000);
    }
  }

  return (
    <>
      <img
        src={success}
        className="h-48 mx-auto"
        attribution={strLang.freepik_attribution}
        alt="success mark from freepik"
      />
      <p className="text-lg mt-6 px-12 font-normal">{message}</p>
      <LinkRouter to={hashRouterList.signIn}>
        <BTNSolid className="mt-8">{strLang.btn_sign_in}</BTNSolid>
      </LinkRouter>
      <div className="my-8 border-b-2 border-primary-grayLight" />
      <p className="text-sm px-12 font-normal">
        {strLang.message_didnt_receive_email_verification}{" "}
        <button className="text-primary-orange underline" onClick={resendVerif}>
          {btnResend}
        </button>
      </p>
    </>
  );
}

function Required() {
  return <span className="text-red-700 px-1">*</span>;
}

// SignUp content
function SignUpContent() {
  const history = useHistory();
  const [formData, setFormData] = React.useState({ ...signUpFormInitialState });
  const [errorMessage, setErrorMessage] = React.useState([]);
  const [createAccountLabel, setCreateAccountLabel] = React.useState(
    strLang.btn_create_account
  );

  const handleInputChange = (e) => {
    const message = [];
    const eForm = formData[e.target.name];
    eForm.value = e.target.value;
    eForm.rules.forEach((rule) => {
      if (rule === validateConfirmPassword) {
        const validated = rule(formData[constFormData.password.key], eForm);
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Check form validation
    const message = [];
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const eForm = formData[key];
        eForm.rules.forEach((rule) => {
          if (rule === validateConfirmPassword) {
            const validated = rule(formData[constFormData.password.key], eForm);
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
      setCreateAccountLabel(strLang.msg_loading);
      const response = await signUp(formData);
      if (response.status === 201) {
        history.push({
          pathname: hashRouterList.message,
          state: {
            message: <MessageContent response={response} formData={formData} />,
          },
        });
      } else {
        // show error message
        setErrorMessage([response.json.message]);
        setCreateAccountLabel(strLang.btn_create_account);
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
        <div>
          <h1 className="text-3xl font-bold mb-2">{strLang.btn_sign_up}</h1>
          <p className="text-sm font-semibold text-gray-700">
            {strLang.sign_up_desc}
          </p>
        </div>
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
        {/* Account Information */}
        <div className="mb-8">
          <h6 className="text-large mt-3 mb-4 font-semibold bg-gray-100">
            {strLang.input_account_information}
          </h6>
          <div className="space-y-4">
            <div className="w-full">
              <label className="text-gray-700">
                {formData.email.label}
                <Required />
              </label>
              <input
                type="email"
                name={formData.email.key}
                value={formData.email.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="relative">
              <label className="text-gray-700">
                {formData.password.label}
                <Required />
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name={formData.password.key}
                value={formData.password.value}
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
                {formData.confirm_password.label}
                <Required />
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name={formData.confirm_password.key}
                value={formData.confirm_password.value}
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
          <div onClick={handleSignUp}>
            <BTNSolid className="w-full">{createAccountLabel}</BTNSolid>
          </div>
          <p className="mt-4 text-sm">
            {strLang.creating_an_account_desc}{" "}
            <LinkRouter
              to={hashRouterList.termsAndConditions}
              className="underline text-primary-orange"
            >
              {strLang.nav_terms_and_conditions}
            </LinkRouter>
          </p>
        </div>
      </div>
    </>
  );
}

// SignUp Page
export default function SignUp() {
  const history = useHistory();
  // Scroll to top on first load
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (isLogin()) {
      history.push(hashRouterList.profile);
    }
  }, [history]);

  return (
    <div className="bg-primary-grayLight h-full py-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white shadow-md p-8 mx-8">
          <SignUpContent />
        </div>
      </div>
      <MarginSpace />
    </div>
  );
}
