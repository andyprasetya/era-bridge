import React from "react";
import { Link as LinkRouter, useHistory } from "react-router-dom";
import { strLang } from "../../functions/language";
import { hashRouterList } from "../../constants/routes";
import { BTNLine, BTNSolid } from "../../components/Button";
import MarginSpace from "../../components/Margin";
import { isLogin, userProfile } from "../../actions/user";
import { getLocalStorageAccount, getLocalStorageProfile } from "../../functions/getLocalStorage";
import {
    cloneObject,
    constFormDataERA,
    constOtherKey,
    constProfileData,
    getCountry,
} from "../../constants/formData";
import { constLocalStorage, constLocalStorageLogin } from "../../constants/localStorage";
import { getDateTimeNow } from "../../functions/date";
import Table from "../../components/Table";
import RowProfileData from "../../components/RowProfileData";
import { listData } from "../../actions/data";
import DeleteData from "../../components/DeleteData";

export const initialMapDataColumn = [
    {
        Header: strLang.input_no,
        accessor: constOtherKey.no,
    },
    {
        Header: strLang.input_uploaded_at,
        accessor: constProfileData.created_at.key,
    },
    {
        Header: strLang.title_status,
        accessor: constOtherKey.status,
    },
    // {
    //     Header: strLang.title_data,
    //     accessor: constOtherKey.viewData,
    // },
    {
        Header: strLang.title_action,
        accessor: constOtherKey.viewData,
    },
    {
        Header: constFormDataERA.title.label,
        accessor: constFormDataERA.title.key,
    },
    {
        Header: constFormDataERA.description.label,
        accessor: constFormDataERA.description.key,
    },
    {
        Header: constFormDataERA.country.label,
        accessor: constFormDataERA.country.key,
    },
    {
        Header: constFormDataERA.organization.label,
        accessor: constFormDataERA.organization.key,
    },
    {
        Header: constFormDataERA.electoral_district_level.label,
        accessor: constFormDataERA.electoral_district_level.key,
    },
    {
        Header: constFormDataERA.electoral_system_design.label,
        accessor: constFormDataERA.electoral_system_design.key,
    },
];

// Data content
function MapData() {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        async function getListMapData() {
            const userID = getLocalStorageAccount().user_id;
            const response = await listData(userID);
            if (response.status === 200) {
                const dataList = response.json.data;
                const mList = [];
                for (let i = 0; i < dataList.length; i++) {
                    const iList = cloneObject(dataList[i]);
                    iList[constOtherKey.no] = mList.length + 1;
                    iList[constFormDataERA.country.key] = getCountry(
                        iList[constFormDataERA.country.key]
                    );
                    iList[constOtherKey.viewData] = (
                        <div>
                            <LinkRouter
                                to={hashRouterList.viewData + "/" + iList[constOtherKey.dataID]}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="text-white bg-primary-grayDark hover:bg-primary-grayLight px-1 focus:outline-none">
                                    {strLang.btn_view}
                                </button>
                            </LinkRouter>
                            {/* <LinkRouter
                                to={hashRouterList.viewData + "/" + iList[constOtherKey.dataID]}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ marginRight: "2px", marginLeft: "2px" }}
                            >
                                <button className="text-white bg-primary-orange hover:bg-primary-orangeDark px-1 focus:outline-none">
                                    {strLang.btn_edit}
                                </button>
                            </LinkRouter> */}
                            <DeleteData dataID={iList[constOtherKey.dataID]} />
                        </div>
                    );
                    mList.push(iList);
                }
                setData(mList);
            }
        }
        getListMapData();
    }, []);

    return (
        <>
            <Table initialColumn={initialMapDataColumn} data={data} />
        </>
    );
}

// Profile Page
export default function Profile() {
    const history = useHistory();
    // Scroll to top on first load
    React.useEffect(() => {
        window.scrollTo(0, 0);

        if (!isLogin()) {
            history.push(hashRouterList.signIn);
        }
    }, [history]);

    const emailAddress = getLocalStorageAccount().email;
    const [profileData, setProfileData] = React.useState(cloneObject(constProfileData));
    const [rowProfileData, setRowProfileData] = React.useState(
        <RowProfileData data={profileData} />
    );

    const handleSignOut = () => {
        constLocalStorageLogin.forEach((keyName) => {
            localStorage.removeItem(keyName);
        });
        window.location.reload();
    };

    React.useEffect(() => {
        const localProfile = getLocalStorageProfile();

        // Inserting value to profile data
        function insertingProfileValue(tempData) {
            const tempProfileData = profileData;
            for (const key in tempProfileData) {
                if (tempProfileData.hasOwnProperty(key)) {
                    tempProfileData[key].value = tempData[key];
                }
            }
            setProfileData(tempProfileData);
            setRowProfileData(<RowProfileData data={tempProfileData} />);
        }
        insertingProfileValue(localProfile);

        // Load from online if available
        async function getUserData() {
            const response = await userProfile();
            if (response.status === 200) {
                const mProfile = response.json.data;
                mProfile[constProfileData.last_sync.key] = getDateTimeNow();
                localStorage.setItem(constLocalStorage.profile, JSON.stringify(mProfile));
                insertingProfileValue(mProfile);
            }
        }
        getUserData();
    }, [profileData]);

    return (
        <div className="bg-primary-grayLight h-full py-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-md p-8 mx-8">
                    <div className="text-black">
                        <div className="border-b-2 border-primary-orange">
                            <h1 className="text-3xl font-bold text-center mb-2">
                                {strLang.btn_profile}
                            </h1>
                            <p className="text-center text-sm mb-4 font-semibold text-gray-700 tracking-wide">
                                {emailAddress}
                            </p>
                        </div>
                        {rowProfileData}
                        <div className="flex justify-center items-center gap-x-2 mt-8">
                            <LinkRouter to={hashRouterList.edit}>
                                <BTNLine className="w-full">{strLang.btn_edit}</BTNLine>
                            </LinkRouter>
                            <div onClick={handleSignOut}>
                                <BTNSolid className="w-full">{strLang.btn_sign_out}</BTNSolid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-4xl mx-auto mt-4">
                <div className="bg-white shadow-md p-8 mx-8">
                    <div className="text-black">
                        <div className="border-b-2 border-primary-orange mb-4">
                            <h1 className="text-3xl font-bold text-center mb-4">
                                {strLang.title_data}
                            </h1>
                        </div>
                        <MapData />
                        <div className="flex justify-center items-center mt-8">
                            <LinkRouter to={hashRouterList.uploadData}>
                                <BTNSolid className="w-full">
                                    {strLang.btn_publish_your_data}
                                </BTNSolid>
                            </LinkRouter>
                        </div>
                    </div>
                </div>
            </div>
            <MarginSpace />
        </div>
    );
}
