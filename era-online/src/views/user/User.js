import React from "react";
import { useParams, Link as LinkRouter } from "react-router-dom";
import { strLang } from "../../functions/language";
import MarginSpace from "../../components/Margin";
import {
  cloneObject,
  constFormDataERA,
  constOtherKey,
  constParams,
  constProfileData,
  getCountry,
} from "../../constants/formData";
import { userData } from "../../actions/user";
import RowProfileData from "../../components/RowProfileData";
import { listData } from "../../actions/data";
import { hashRouterList } from "../../constants/routes";
import Table from "../../components/Table";
import { initialMapDataColumn } from "./Profile";

// Data content
function MapData({ userDataID }) {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    async function getListMapData() {
      const response = await listData(userDataID);
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
            <LinkRouter
              to={hashRouterList.viewData + "/" + iList[constOtherKey.dataID]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="text-white bg-primary-orange hover:bg-primary-orangeDark px-1 focus:outline-none">
                {strLang.title_data}
              </button>
            </LinkRouter>
          );
          mList.push(iList);
        }
        setData(mList);
      }
    }
    getListMapData();
  }, [userDataID]);

  return (
    <>
      <Table initialColumn={initialMapDataColumn} data={data} />
    </>
  );
}

// User Page
export default function User() {
  const params = useParams();
  const [profileData, setProfileData] = React.useState(
    cloneObject(constProfileData)
  );
  const [rowProfileData, setRowProfileData] = React.useState(
    <RowProfileData data={profileData} />
  );
  // Scroll to top on first load
  React.useEffect(() => {
    window.scrollTo(0, 0);

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

    // Load from online data
    async function getUserData(userDataID) {
      const response = await userData(userDataID);
      if (response.status === 200) {
        insertingProfileValue(response.json.data);
      } else {
        setRowProfileData(
          <div className="text-center mt-8">{response.json.message}</div>
        );
      }
    }
    getUserData(params[constParams.id]);
  }, [params, profileData]);

  return (
    <div className="bg-primary-grayLight h-full py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md p-8 mx-8">
          <div className="text-black">
            <div className="border-b-2 border-primary-orange">
              <h1 className="text-3xl font-bold text-center mb-4">
                {strLang.nav_user_profile}
              </h1>
            </div>
            {rowProfileData}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-4">
        <div className="bg-white shadow-md p-8 mx-8">
          <div className="text-black">
            <div className="border-b-2 border-primary-orange">
              <h1 className="text-3xl font-bold text-center mb-4">
                {strLang.title_data}
              </h1>
            </div>
            <MapData userDataID={params[constParams.id]} />
          </div>
        </div>
      </div>
      <MarginSpace />
    </div>
  );
}
