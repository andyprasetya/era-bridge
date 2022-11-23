import React from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import { strLang } from "../functions/language";
import { BTNLine } from "./Button";
import { constDataStatus, constOtherKey } from "../constants/formData";
import { statusData } from "../actions/data";

// Update Data status and Modal
export default function DeleteData({ dataID }) {
    const [openModal, setOpenModal] = React.useState(false);
    const [btnLabel, setBtnLabel] = React.useState(strLang.btn_confirm);

    const handleDelete = async (e) => {
        e.preventDefault();

        setBtnLabel(strLang.msg_loading);
        // Update Data Status
        const response = await statusData({
            [constOtherKey.dataID]: { value: dataID },
            [constOtherKey.status]: { value: constDataStatus.delete },
            type: { value: "USER" },
        });
        alert(response.json.message);
        if (response.status === 200) {
            window.location.reload();
        }
        setBtnLabel(strLang.btn_confirm);
    };

    return (
        <>
            <button
                onClick={() => setOpenModal(true)}
                className="text-white bg-secondary-red hover:bg-secondary-pink px-1 focus:outline-none"
            >
                {strLang.btn_delete}
            </button>
            {/* popup */}
            <Modal size="regular" active={openModal} toggler={() => setOpenModal(false)}>
                <ModalBody>
                    <div className="text-black">
                        <div>
                            <h1 className="text-3xl font-bold text-center mb-2">
                                {strLang.title_delete_data}
                            </h1>
                        </div>
                        <div className="my-4 max-w-sm">
                            <p className="text-center font-normal whitespace-pre-line">
                                {strLang.delete_data_desc}
                            </p>
                        </div>
                        <div className="flex justify-center items-center gap-x-2 gap-y-8 mt-8">
                            <div className="text-center">
                                <div onClick={handleDelete}>
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
