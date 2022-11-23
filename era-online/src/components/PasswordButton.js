import React from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import { strLang } from "../functions/language";
import { BTNLine, BTNSolid } from "./Button";
import { constFormData } from "../constants/formData";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { confirmPassword } from "../actions/user";

// Password Button and Modal
export default function PasswordButton({ handleFunction }) {
  const [openModal, setOpenModal] = React.useState(false);
  const [formData, setFormData] = React.useState({
    [constFormData.password.key]: { ...constFormData.password },
  });
  const [errorMessage, setErrorMessage] = React.useState([]);
  const [btnLabel, setBtnLabel] = React.useState(strLang.btn_confirm);

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

  const handleUpdate = async (e) => {
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
      setBtnLabel(strLang.msg_loading);
      // Confirm is password right
      const response = await confirmPassword(formData);
      if (response.status === 200) {
        // run function from parent data
        await handleFunction();
        setOpenModal(false);
      } else {
        setErrorMessage([response.json.message]);
      }
      setBtnLabel(strLang.btn_confirm);
    }
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div onClick={() => setOpenModal(true)}>
        <BTNLine className="w-full">{strLang.btn_save}</BTNLine>
      </div>
      {/* Sign In Modal Popup */}
      <Modal
        size="regular"
        active={openModal}
        toggler={() => setOpenModal(false)}
      >
        <ModalBody>
          <div className="text-black">
            <div>
              <h1 className="text-3xl font-bold text-center mb-2">
                {strLang.input_confirm_password}
              </h1>
              <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide">
                {strLang.confirm_password_desc}
              </p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name={formData.password.key}
                  placeholder={formData.password.label}
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
            {/* Error Message */}
            <div className="mt-6 max-w-sm">
              <p className="text-center text-sm font-light text-red-700 whitespace-pre-line">
                {errorMessage.join("\r\n")}
              </p>
            </div>
            <div className="text-center mt-3">
              <div onClick={handleUpdate}>
                <BTNSolid className="w-full">{btnLabel}</BTNSolid>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
