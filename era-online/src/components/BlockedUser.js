import React from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import { strLang } from "../functions/language";
import { BTNLine } from "./Button";
import { constFormData, constOtherKey } from "../constants/formData";
import { blocked } from "../actions/user";

function getMessage(data) {
  if (data[constOtherKey.blocked] === "1") {
    return {
      title: strLang.input_unblock_title,
      message:
        strLang.msg_block_title + " " + data[constFormData.email.key] + " ?",
      blocked: 0,
      userID: data[constOtherKey.userID],
    };
  }
  return {
    title: strLang.input_block_title,
    message:
      strLang.msg_unblock_title + " " + data[constFormData.email.key] + " ?",
    blocked: 1,
    userID: data[constOtherKey.userID],
  };
}

// Blocked Switch and Modal
export default function BlockedUser({ user }) {
  const modalMessage = getMessage(user);
  const [openModal, setOpenModal] = React.useState(false);
  const formData = {
    [constOtherKey.userDataID]: { value: modalMessage.userID },
    [constOtherKey.userDataBlocked]: { value: modalMessage.blocked },
  };
  const [btnLabel, setBtnLabel] = React.useState(strLang.btn_confirm);

  const handleBlock = async (e) => {
    e.preventDefault();

    setBtnLabel(strLang.msg_loading);
    // Blocking user
    const response = await blocked(formData);
    alert(response.json.message);
    if (response.status === 200) {
      window.location.reload();
    }
    setBtnLabel(strLang.btn_confirm);
  };

  return (
    <>
      <div
        onClick={() => setOpenModal(true)}
        className="relative inline-block w-10 mr-2 align-middle"
      >
        <input
          type="checkbox"
          className={
            modalMessage.blocked
              ? "border-gray-300 absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              : "border-primary-orange right-0 absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          }
        />
        <label
          className={
            modalMessage.blocked
              ? "bg-gray-300 block overflow-hidden h-6 rounded-full cursor-pointer"
              : "bg-primary-orange block overflow-hidden h-6 rounded-full cursor-pointer"
          }
        ></label>
      </div>
      {/* Block popup */}
      <Modal
        size="regular"
        active={openModal}
        toggler={() => setOpenModal(false)}
      >
        <ModalBody>
          <div className="text-black">
            <div>
              <h1 className="text-3xl font-bold text-center mb-2">
                {modalMessage.title}
              </h1>
            </div>
            <div className="my-8 max-w-sm">
              <p className="text-center font-normal whitespace-pre-line">
                {modalMessage.message}
              </p>
            </div>
            <div className="text-center mt-3">
              <div onClick={handleBlock}>
                <BTNLine className="w-full">{btnLabel}</BTNLine>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
