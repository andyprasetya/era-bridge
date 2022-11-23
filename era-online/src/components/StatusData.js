import React from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import { strLang } from "../functions/language";
import { BTNLine } from "./Button";
import {
  constDataStatusArr,
  constFormDataERA,
  constOtherKey,
} from "../constants/formData";
import { statusData } from "../actions/data";

// Update Data status and Modal
export default function StatusData({ data }) {
  const [openModal, setOpenModal] = React.useState(false);
  const [status, setStatus] = React.useState(data[constOtherKey.status]);
  const formData = {
    [constOtherKey.dataID]: { value: data[constOtherKey.dataID] },
    [constOtherKey.status]: { value: status },
  };
  const [btnLabel, setBtnLabel] = React.useState(strLang.btn_confirm);

  const handleStatus = async (e) => {
    e.preventDefault();

    setBtnLabel(strLang.msg_loading);
    // Update Data Status
    const response = await statusData(formData);
    alert(response.json.message);
    if (response.status === 200) {
      window.location.reload();
    }
    setBtnLabel(strLang.btn_confirm);
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="text-primary-grayDark hover:bg-primary-grayLight px-1 border border-primary-grayDark focus:outline-none"
      >
        {data[constOtherKey.status]}
      </button>
      {/* popup */}
      <Modal
        size="regular"
        active={openModal}
        toggler={() => setOpenModal(false)}
      >
        <ModalBody>
          <div className="text-black">
            <div>
              <h1 className="text-3xl font-bold text-center mb-2">
                {strLang.title_change_data_status}
              </h1>
            </div>
            <div className="my-4 max-w-sm">
              <p className="text-center font-normal whitespace-pre-line">
                {strLang.change_data_status_desc + " "}{" "}
                <b>{data[constFormDataERA.title.key] + "?"}</b>
              </p>
            </div>
            <div className="flex justify-center items-center gap-x-2 gap-y-8 mt-8">
              <select
                value={status}
                className="text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleChange(e)}
              >
                {constDataStatusArr.map((status, idx) => (
                  <option key={idx} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <div className="text-center">
                <div onClick={handleStatus}>
                  <BTNLine className="w-full">{btnLabel}</BTNLine>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
