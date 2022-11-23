import React from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import { strLang } from "../functions/language";
import { BTNLine } from "./Button";
import { constFormData } from "../constants/formData";
import { resetPassword, resetPasswordType } from "../actions/user";

// Profile Button and Modal
export default function ForgotPassword() {
  const [openModal, setOpenModal] = React.useState(false);
  const [formData, setFormData] = React.useState({
    [constFormData.email.key]: { ...constFormData.email },
  });
  const [errorMessage, setErrorMessage] = React.useState([]);
  const [btnVisibility, setBtnVisibility] = React.useState(true);

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

  const handleReset = async (e) => {
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
      setBtnVisibility(false);
      // Send email reset password
      const response = await resetPassword(
        formData,
        resetPasswordType.verification
      );
      if (response.status === 200) {
        // enable reset again after a minute
        setTimeout(function () {
          setBtnVisibility(true);
        }, 60000);
      } else {
        setBtnVisibility(true);
      }
      setErrorMessage([response.json.message]);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="underline text-primary-orange text-sm"
      >
        {strLang.btn_forgot_password}
      </button>
      {/* Forgot Password Modal Popup */}
      <Modal
        size="regular"
        active={openModal}
        toggler={() => setOpenModal(false)}
      >
        <ModalBody>
          <div className="text-black">
            <div className="border-b-2 border-primary-orange mb-4">
              <h1 className="text-3xl font-bold text-center mb-2">
                {strLang.btn_forgot_password}
              </h1>
            </div>
            <div className="space-y-4 my-4">
              <input
                type="email"
                name={formData.email.key}
                placeholder={formData.email.label}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            {/* Error Message */}
            <div className="mt-6 max-w-sm">
              <p className="text-center text-sm font-light text-red-700 whitespace-pre-line">
                {errorMessage.join("\r\n")}
              </p>
            </div>
            {btnVisibility && (
              <div className="text-center mt-3">
                <div onClick={handleReset}>
                  <BTNLine className="w-full">
                    {strLang.btn_reset_password}
                  </BTNLine>
                </div>
              </div>
            )}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
