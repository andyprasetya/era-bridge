import React from "react";
import { Link as LinkRouter, useHistory } from "react-router-dom";
import { strLang } from "../../functions/language";
import { hashRouterList } from "../../constants/routes";
import { BTNSolid } from "../../components/Button";
import MarginSpace from "../../components/Margin";
import { constFormData } from "../../constants/formData";
import {
  constLocalStorage,
  constLocalStorageLogin,
} from "../../constants/localStorage";
import { isLogin, signIn } from "../../actions/user";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import ForgotPassword from "../../components/ForgotPassword";

const singInFormInitialState = {
  [constFormData.email.key]: { ...constFormData.email },
  [constFormData.password.key]: { ...constFormData.password },
};

// SignIn content
function SignInContent() {
  const [formData, setFormData] = React.useState({ ...singInFormInitialState });
  const [errorMessage, setErrorMessage] = React.useState([]);
  const [signInLabel, setSignInLabel] = React.useState(strLang.btn_sign_in);

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

  const handleLogin = async (e) => {
    e.preventDefault();

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
      setSignInLabel(strLang.msg_loading);
      const response = await signIn(formData);
      if (response.status === 202 && response.json.login) {
        // save data to localstorage
        localStorage.setItem(constLocalStorage.login, response.json.login);
        localStorage.setItem(
          constLocalStorage.account,
          JSON.stringify(response.json.data)
        );
        window.location.reload();
      } else {
        // clear login localstorage
        constLocalStorageLogin.forEach((keyName) => {
          localStorage.removeItem(keyName);
        });
        setErrorMessage([response.json.message]);
      }
      setSignInLabel(strLang.btn_sign_in);
    }
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="text-black">
      <div>
        <h1 className="text-3xl font-bold text-center mb-2">
          {strLang.btn_sign_in}
        </h1>
        <p className="text-center text-sm mb-8 font-semibold text-gray-700">
          {strLang.sign_in_desc}
        </p>
      </div>
      <div className="space-y-4">
        <input
          type="email"
          name={formData.email.key}
          placeholder={formData.email.label}
          value={formData.email.value}
          className="block text-base py-3 px-4 w-full border outline-none"
          onChange={(e) => handleInputChange(e)}
        />
        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name={formData.password.key}
              placeholder={formData.password.label}
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
          <div className="ml-auto text-right">
            <ForgotPassword />
          </div>
        </div>
      </div>
      {/* Error Message */}
      <div className="mt-6 max-w-sm mx-auto">
        <p className="text-center text-sm font-light text-red-700 whitespace-pre-line">
          {errorMessage.join("\r\n")}
        </p>
      </div>
      <div className="text-center mt-3">
        <div onClick={handleLogin}>
          <BTNSolid className="w-full">{signInLabel}</BTNSolid>
        </div>
        <p className="mt-4 text-sm">
          {strLang.didnt_have_account}{" "}
          <LinkRouter
            to={hashRouterList.signUp}
            className="underline text-primary-orange"
          >
            {strLang.btn_sign_up}
          </LinkRouter>
        </p>
      </div>
    </div>
  );
}

// SignIn Page
export default function SignIn() {
  const history = useHistory();
  // Scroll to top on first load
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (isLogin()) {
      history.push(hashRouterList.profile);
    }
  }, [history]);

  return (
    <div className="bg-primary-grayLight h-full py-16">
      <div className="max-w-xl mx-auto">
        <div className="bg-white shadow-md p-8 mx-8">
          <SignInContent />
        </div>
      </div>
      <MarginSpace />
    </div>
  );
}
