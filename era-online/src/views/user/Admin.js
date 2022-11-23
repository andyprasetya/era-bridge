import React from "react";
import { Link as LinkRouter, useHistory } from "react-router-dom";
import { strLang } from "../../functions/language";
import { hashRouterList } from "../../constants/routes";
import MarginSpace from "../../components/Margin";
import { isAdmin, listUser } from "../../actions/user";
import Tab, { TabChild } from "../../components/Tab";
import { constLocalStorageLogin } from "../../constants/localStorage";
import {
  cloneObject,
  constDataStatus,
  constFormData,
  constFormDataERA,
  constOtherKey,
  constProfileData,
  getCountry,
} from "../../constants/formData";
import BlockedUser from "../../components/BlockedUser";
import Table from "../../components/Table";
import { listDataAdmin } from "../../actions/data";
import StatusData from "../../components/StatusData";

// User content
function UserManagement() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    async function getListUser() {
      const response = await listUser();
      if (response.status === 200) {
        setData(response.json.data);
      } else if (response.status === 403) {
        // clear login localstorage
        constLocalStorageLogin.forEach((keyName) => {
          localStorage.removeItem(keyName);
        });
        window.location.reload();
      } else {
        alert(response.json.message);
      }
    }
    getListUser();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{strLang.title_list_admin}</h2>
      <AdminTable userList={data} />
      <div className="my-8 border-b-2 border-primary-orange" />
      <h2 className="text-2xl font-bold mb-4">{strLang.title_list_user}</h2>
      <UserVerifiedTable userList={data} />
      <div className="my-8 border-b-2 border-primary-orange" />
      <h2 className="text-2xl font-bold mb-4">
        {strLang.title_list_user_not_verified}
      </h2>
      <UserNotVerifiedTable userList={data} />
    </>
  );
}

// Data Content
function DataManagement() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    async function getListData() {
      const response = await listDataAdmin();
      if (response.status === 200) {
        setData(response.json.data);
      } else if (response.status === 403) {
        // clear login localstorage
        constLocalStorageLogin.forEach((keyName) => {
          localStorage.removeItem(keyName);
        });
        window.location.reload();
      }
    }
    getListData();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{strLang.title_pending}</h2>
      <DataPendingTable dataList={data} />
      <div className="my-8 border-b-2 border-primary-orange" />
      <h2 className="text-2xl font-bold mb-4">{strLang.title_verified}</h2>
      <DataVerifiedTable dataList={data} />
      <div className="my-8 border-b-2 border-primary-orange" />
      <h2 className="text-2xl font-bold mb-4">{strLang.title_reject}</h2>
      <DataRejectTable dataList={data} />
    </>
  );
}

const initialAdminColumn = [
  {
    Header: strLang.input_no,
    accessor: constOtherKey.no,
  },
  {
    Header: constProfileData.created_at.label,
    accessor: constProfileData.created_at.key,
  },
  {
    Header: strLang.btn_profile,
    accessor: constOtherKey.viewProfile,
  },
  {
    Header: constFormData.email.label,
    accessor: constFormData.email.key,
  },
  {
    Header: constFormData.title.label,
    accessor: constFormData.title.key,
  },
  {
    Header: constFormData.first_name.label,
    accessor: constFormData.first_name.key,
  },
  {
    Header: constFormData.last_name.label,
    accessor: constFormData.last_name.key,
  },
  {
    Header: constFormData.institution_name.label,
    accessor: constFormData.institution_name.key,
  },
  {
    Header: constFormData.department.label,
    accessor: constFormData.department.key,
  },
  {
    Header: constFormData.country.label,
    accessor: constFormData.country.key,
  },
  {
    Header: constFormData.expertise_field_of_issue.label,
    accessor: constFormData.expertise_field_of_issue.key,
  },
  {
    Header: constFormData.institution_email.label,
    accessor: constFormData.institution_email.key,
  },
  // {
  //   Header: constFormData.institution_phone_number.label,
  //   accessor: constFormData.institution_phone_number.key,
  // },
];

const initialUserColumn = [
  {
    Header: strLang.input_no,
    accessor: constOtherKey.no,
  },
  {
    Header: constProfileData.created_at.label,
    accessor: constProfileData.created_at.key,
  },
  {
    Header: strLang.input_block,
    accessor: constOtherKey.blockedItem,
  },
  {
    Header: strLang.btn_profile,
    accessor: constOtherKey.viewProfile,
  },
  {
    Header: constFormData.email.label,
    accessor: constFormData.email.key,
  },
  {
    Header: constFormData.title.label,
    accessor: constFormData.title.key,
  },
  {
    Header: constFormData.first_name.label,
    accessor: constFormData.first_name.key,
  },
  {
    Header: constFormData.last_name.label,
    accessor: constFormData.last_name.key,
  },
  {
    Header: constFormData.institution_name.label,
    accessor: constFormData.institution_name.key,
  },
  {
    Header: constFormData.department.label,
    accessor: constFormData.department.key,
  },
  {
    Header: constFormData.country.label,
    accessor: constFormData.country.key,
  },
  {
    Header: constFormData.expertise_field_of_issue.label,
    accessor: constFormData.expertise_field_of_issue.key,
  },
  {
    Header: constFormData.institution_email.label,
    accessor: constFormData.institution_email.key,
  },
  // {
  //   Header: constFormData.institution_phone_number.label,
  //   accessor: constFormData.institution_phone_number.key,
  // },
];

const initialMapDataColumn = [
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
    accessor: constOtherKey.statusChange,
  },
  {
    Header: strLang.btn_profile,
    accessor: constOtherKey.viewProfile,
  },
  {
    Header: constFormData.email.label,
    accessor: constFormData.email.key,
  },
  {
    Header: strLang.title_data,
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

function DataPendingTable({ dataList }) {
  const [data, setData] = React.useState(dataList);
  React.useEffect(() => {
    const mList = [];
    for (let i = 0; i < dataList.length; i++) {
      const iList = cloneObject(dataList[i]);
      if (iList[constOtherKey.status] === constDataStatus.pending) {
        iList[constOtherKey.no] = mList.length + 1;
        iList[constFormData.country.key] = getCountry(
          iList[constFormData.country.key]
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
        iList[constOtherKey.statusChange] = <StatusData data={iList} />;
        iList[constOtherKey.viewProfile] = (
          <LinkRouter
            to={hashRouterList.user + "/" + iList[constOtherKey.userID]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="text-white bg-primary-orange hover:bg-primary-orangeDark px-1 focus:outline-none">
              {strLang.btn_profile}
            </button>
          </LinkRouter>
        );
        mList.push(iList);
      }
    }
    setData(mList);
  }, [dataList]);

  return <Table initialColumn={initialMapDataColumn} data={data} />;
}

function DataVerifiedTable({ dataList }) {
  const [data, setData] = React.useState(dataList);
  React.useEffect(() => {
    const mList = [];
    for (let i = 0; i < dataList.length; i++) {
      const iList = cloneObject(dataList[i]);
      if (iList[constOtherKey.status] === constDataStatus.verified) {
        iList[constOtherKey.no] = mList.length + 1;
        iList[constFormData.country.key] = getCountry(
          iList[constFormData.country.key]
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
        iList[constOtherKey.statusChange] = <StatusData data={iList} />;
        iList[constOtherKey.viewProfile] = (
          <LinkRouter
            to={hashRouterList.user + "/" + iList[constOtherKey.userID]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="text-white bg-primary-orange hover:bg-primary-orangeDark px-1 focus:outline-none">
              {strLang.btn_profile}
            </button>
          </LinkRouter>
        );
        mList.push(iList);
      }
    }
    setData(mList);
  }, [dataList]);

  return <Table initialColumn={initialMapDataColumn} data={data} />;
}

function DataRejectTable({ dataList }) {
  const [data, setData] = React.useState(dataList);
  React.useEffect(() => {
    const mList = [];
    for (let i = 0; i < dataList.length; i++) {
      const iList = cloneObject(dataList[i]);
      if (iList[constOtherKey.status] === constDataStatus.reject) {
        iList[constOtherKey.no] = mList.length + 1;
        iList[constFormData.country.key] = getCountry(
          iList[constFormData.country.key]
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
        iList[constOtherKey.statusChange] = <StatusData data={iList} />;
        iList[constOtherKey.viewProfile] = (
          <LinkRouter
            to={hashRouterList.user + "/" + iList[constOtherKey.userID]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="text-white bg-primary-orange hover:bg-primary-orangeDark px-1 focus:outline-none">
              {strLang.btn_profile}
            </button>
          </LinkRouter>
        );
        mList.push(iList);
      }
    }
    setData(mList);
  }, [dataList]);

  return <Table initialColumn={initialMapDataColumn} data={data} />;
}

function AdminTable({ userList }) {
  const [data, setData] = React.useState(userList);
  React.useEffect(() => {
    const mList = [];
    for (let i = 0; i < userList.length; i++) {
      const iUserList = cloneObject(userList[i]);
      if (iUserList[constOtherKey.admin] === "1") {
        iUserList[constOtherKey.no] = mList.length + 1;
        iUserList[constFormData.country.key] = getCountry(
          iUserList[constFormData.country.key]
        );
        iUserList[constOtherKey.viewProfile] = (
          <LinkRouter
            to={hashRouterList.user + "/" + iUserList[constOtherKey.userID]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="text-white bg-primary-orange hover:bg-primary-orangeDark px-1 focus:outline-none">
              {strLang.btn_profile}
            </button>
          </LinkRouter>
        );
        mList.push(iUserList);
      }
    }
    setData(mList);
  }, [userList]);

  return <Table initialColumn={initialAdminColumn} data={data} />;
}

function UserVerifiedTable({ userList }) {
  const [data, setData] = React.useState(userList);
  React.useEffect(() => {
    const mList = [];
    for (let i = 0; i < userList.length; i++) {
      const iUserList = cloneObject(userList[i]);
      if (
        iUserList[constOtherKey.admin] !== "1" &&
        iUserList[constOtherKey.verified] === "1"
      ) {
        iUserList[constOtherKey.no] = mList.length + 1;
        iUserList[constFormData.country.key] = getCountry(
          iUserList[constFormData.country.key]
        );
        iUserList[constOtherKey.viewProfile] = (
          <LinkRouter
            to={hashRouterList.user + "/" + iUserList[constOtherKey.userID]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="text-white bg-primary-orange hover:bg-primary-orangeDark px-1 focus:outline-none">
              {strLang.btn_profile}
            </button>
          </LinkRouter>
        );
        iUserList[constOtherKey.blockedItem] = <BlockedUser user={iUserList} />;
        mList.push(iUserList);
      }
    }
    setData(mList);
  }, [userList]);

  return <Table initialColumn={initialUserColumn} data={data} />;
}

function UserNotVerifiedTable({ userList }) {
  const [data, setData] = React.useState(userList);
  React.useEffect(() => {
    const mList = [];
    for (let i = 0; i < userList.length; i++) {
      const iUserList = cloneObject(userList[i]);
      if (
        iUserList[constOtherKey.admin] !== "1" &&
        iUserList[constOtherKey.verified] !== "1"
      ) {
        iUserList[constOtherKey.no] = mList.length + 1;
        iUserList[constFormData.country.key] = getCountry(
          iUserList[constFormData.country.key]
        );
        iUserList[constOtherKey.viewProfile] = (
          <LinkRouter
            to={hashRouterList.user + "/" + iUserList[constOtherKey.userID]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="text-white bg-primary-orange hover:bg-primary-orangeDark px-1 focus:outline-none">
              {strLang.btn_profile}
            </button>
          </LinkRouter>
        );
        iUserList[constOtherKey.blockedItem] = <BlockedUser user={iUserList} />;
        mList.push(iUserList);
      }
    }
    setData(mList);
  }, [userList]);

  return <Table initialColumn={initialUserColumn} data={data} />;
}

// Admin Page
export default function Admin() {
  const history = useHistory();
  const [openTab, setOpenTab] = React.useState(0);
  // Scroll to top on first load
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isAdmin()) {
      history.push(hashRouterList.profile);
    }
  }, [history]);

  return (
    <div className="bg-primary-grayLight h-full py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md p-8 mx-8">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4">
              {strLang.btn_admin}
            </h1>
          </div>
          <Tab
            list={[strLang.btn_user_management, strLang.btn_data_management]}
            open={openTab}
            state={setOpenTab}
          />
          <div className="mt-3 py-3">
            <div className="container mx-auto max-w-full">
              {/* Get tab item content */}
              <TabChild
                list={[<UserManagement />, <DataManagement />]}
                open={openTab}
              />
            </div>
          </div>
        </div>
      </div>
      <MarginSpace />
    </div>
  );
}
