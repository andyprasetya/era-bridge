import React from "react";
import { Link as LinkRouter, useHistory } from "react-router-dom";
import { strLang } from "../../functions/language";
import { hashRouterList } from "../../constants/routes";
import { BTNSolid, BTNSolidSecondary } from "../../components/Button";
import MarginSpace from "../../components/Margin";
import {
  constFormDataERA,
  constFormDataERAType,
  electoralDistrictLevelList,
  electoralSystemDesignList,
  organizationList,
  yesNoList,
} from "../../constants/formData";
import { isLogin } from "../../actions/user";
import CountryList from "../../data/json/country.json";
import success from "../../images/success.png";
import { uploadData } from "../../actions/data";
import {
  validateDataFromJSON,
  validateFileFormat,
  validateRequired,
} from "../../functions/validate";

// Message content if creating account success
function MessageContent({ response }) {
  return (
    <>
      <img
        src={success}
        className="h-48 mx-auto"
        attribution={strLang.freepik_attribution}
        alt="success mark from freepik"
      />
      <p className="text-lg mt-6 px-12 font-normal">{response.json.message}</p>
      <LinkRouter
        to={hashRouterList.viewData + "/" + response.json.data.data_id}
      >
        <BTNSolidSecondary className="mt-8">
          {strLang.title_view_data}
        </BTNSolidSecondary>
      </LinkRouter>
    </>
  );
}

function Required() {
  return <span className="text-red-700 px-1">*</span>;
}

// SignUp content
function UploadDataContent() {
  const history = useHistory();
  const [formData, setFormData] = React.useState({ ...constFormDataERA });
  const [errorMessage, setErrorMessage] = React.useState([]);
  const [btnLabel, setBtnLabel] = React.useState(strLang.btn_upload_data);

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

  const handleSelectCopyright = (e) => {
    const eForm = formData[formData.copyright_holder.key];
    if (e.target.name === formData.spatial_data_publish_permission.key) {
      if (e.target.value === yesNoList[0]) {
        eForm.display = false;
        eForm.rules = [validateFileFormat];
      } else if (e.target.value === yesNoList[1]) {
        eForm.display = true;
        eForm.rules = [validateRequired, validateFileFormat];
      }
    }
    setFormData((prevState) => {
      return {
        ...prevState,
        [formData.copyright_holder.key]: eForm,
      };
    });
  };

  const handleChangeFileType = (e) => {
    const eForm = formData[e.target.name];
    eForm.fileFormat = e.target.value;
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: eForm,
      };
    });
  };

  const handleInputFile = (e) => {
    const message = [];
    const eForm = formData[e.target.name];
    eForm.value = e.target.value;
    eForm.rules.forEach((rule) => {
      const validated = rule(eForm);
      if (!validated.passed) {
        message.push(validated.message);
      }
    });
    eForm.file = e.target.files[0];
    validateOfflineJSON(eForm);
    setErrorMessage(message);
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: eForm,
      };
    });
  };

  // Validate file upload as json from offline app
  const validateOfflineJSON = async (form) => {
    const msgValidate = await validateDataFromJSON(form);
    if (!msgValidate.passed) {
      setErrorMessage((prevState) => {
        return [...prevState, msgValidate.message];
      });
    }
  };

  const handleButton = async (e) => {
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
      const response = await uploadData(formData);
      if (response.status === 201) {
        history.push({
          pathname: hashRouterList.message,
          state: {
            message: <MessageContent response={response} />,
          },
        });
      } else {
        // show error message
        setErrorMessage([response.json.message]);
        setBtnLabel(strLang.btn_upload_data);
      }
    }
  };
  return (
    <>
      <div className="text-black">
        <div>
          <h1 className="text-3xl font-bold mb-2">{strLang.btn_upload_data}</h1>
          <p className="text-sm font-semibold text-gray-700">
            {strLang.upload_data_desc}
          </p>
        </div>
        <div className="border-b border-primary-orange mt-4 mb-8" />
        {/* General Information */}
        <div className="mb-8">
          <h6 className="text-large mt-3 mb-4 font-semibold bg-gray-100">
            {strLang.title_general_information}
          </h6>
          <div className="space-y-4">
            <div className="w-full">
              <label className="text-gray-700">
                {formData.title.label}
                <Required />
              </label>
              <input
                type="text"
                name={formData.title.key}
                value={formData.title.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="w-full">
              <label className="text-gray-700">
                {formData.description.label}
                <Required />
              </label>
              <input
                type="text"
                name={formData.description.key}
                value={formData.description.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="w-full">
              <label className="text-gray-700">
                {formData.spatial_data.label}
                <Required />
              </label>
              <div className="flex justify-center items-center gap-x-2">
                <select
                  name={formData.spatial_data.key}
                  value={formData.spatial_data.fileFormat}
                  className="text-base py-3 px-4 w-full border outline-none"
                  onChange={(e) => handleChangeFileType(e)}
                >
                  {constFormDataERAType.map((type, idx) => (
                    <option key={idx} value={type.format}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <input
                  type="file"
                  accept={formData.spatial_data.fileFormat}
                  name={formData.spatial_data.key}
                  className="text-base py-3 px-4 w-full border outline-none"
                  onChange={(e) => handleInputFile(e)}
                />
              </div>
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
            <div>
              <label className="text-gray-700">
                {formData.organization.label}
                <Required />
              </label>
              <select
                name={formData.organization.key}
                value={formData.organization.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              >
                {organizationList.map((input, idx) => (
                  <option key={idx} value={input}>
                    {input}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Data Information */}
        <div className="mb-8">
          <h6 className="text-large mt-3 mb-4 font-semibold bg-gray-100">
            {strLang.title_data_information}
          </h6>
          <div className="space-y-4">
            {/* Population Data */}
            <div className="w-full">
              <label className="text-gray-700">
                {formData.population_data_source.label}
                <Required />
              </label>
              <input
                type="text"
                name={formData.population_data_source.key}
                value={formData.population_data_source.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            {/* <div className="w-full">
              <label className="text-gray-700">
                {formData.population_data_available_online.label}
                <Required />
              </label>
              <select
                name={formData.population_data_available_online.key}
                value={formData.population_data_available_online.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              >
                {yesNoList.map((input, idx) => (
                  <option key={idx} value={input}>
                    {input}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="w-full">
              <label className="text-gray-700">
                {formData.population_data_publish_permission.label}
                <Required />
              </label>
              <select
                name={formData.population_data_publish_permission.key}
                value={formData.population_data_publish_permission.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              >
                {yesNoList.map((input, idx) => (
                  <option key={idx} value={input}>
                    {input}
                  </option>
                ))}
              </select>
            </div>
            {/* Spatial Data */}
            <div className="w-full">
              <label className="text-gray-700">
                {formData.spatial_data_source.label}
                <Required />
              </label>
              <input
                type="text"
                name={formData.spatial_data_source.key}
                value={formData.spatial_data_source.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            {/* <div className="w-full">
              <label className="text-gray-700">
                {formData.spatial_data_available_online.label}
                <Required />
              </label>
              <select
                name={formData.spatial_data_available_online.key}
                value={formData.spatial_data_available_online.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              >
                {yesNoList.map((input, idx) => (
                  <option key={idx} value={input}>
                    {input}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="w-full">
              <label className="text-gray-700">
                {formData.spatial_data_publish_permission.label}
                <Required />
              </label>
              <select
                name={formData.spatial_data_publish_permission.key}
                value={formData.spatial_data_publish_permission.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => {
                  handleInputChange(e);
                  handleSelectCopyright(e);
                }}
              >
                {yesNoList.map((input, idx) => (
                  <option key={idx} value={input}>
                    {input}
                  </option>
                ))}
              </select>
            </div>
            {formData[formData.copyright_holder.key].display && (
              <div className="w-full">
                <label className="text-gray-700 whitespace-pre-wrap">
                  {formData.copyright_holder.label}
                  <Required />
                </label>
                <input
                  type="file"
                  accept={formData.copyright_holder.fileFormat}
                  name={formData.copyright_holder.key}
                  className="block text-base py-3 px-4 w-full border outline-none"
                  onChange={(e) => handleInputFile(e)}
                />
              </div>
            )}
          </div>
        </div>
        {/* Electoral Information */}
        <div className="mb-8">
          <h6 className="text-large mt-3 mb-4 font-semibold bg-gray-100">
            {strLang.title_electoral_information}
          </h6>
          <div className="space-y-4">
            {/* Electoral */}
            <div className="w-full">
              <label className="text-gray-700">
                {formData.electoral_district_level.label}
                <Required />
              </label>
              <select
                name={formData.electoral_district_level.key}
                value={formData.electoral_district_level.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              >
                {electoralDistrictLevelList.map((input, idx) => (
                  <option key={idx} value={input}>
                    {input}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="text-gray-700">
                {formData.electoral_system_design.label}
                <Required />
              </label>
              <select
                name={formData.electoral_system_design.key}
                value={formData.electoral_system_design.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              >
                {electoralSystemDesignList.map((input, idx) => (
                  <option key={idx} value={input}>
                    {input}
                  </option>
                ))}
              </select>
            </div>
            {/* Seat */}
            <div className="w-full">
              <label className="text-gray-700">
                {formData.minimum_seat_allocation.label}
              </label>
              <input
                type="number"
                name={formData.minimum_seat_allocation.key}
                value={formData.minimum_seat_allocation.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="w-full">
              <label className="text-gray-700">
                {formData.maximum_seat_allocation.label}
              </label>
              <input
                type="number"
                name={formData.maximum_seat_allocation.key}
                value={formData.maximum_seat_allocation.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            {/* Standard */}
            <div className="w-full">
              <label className="text-gray-700">
                {formData.standard_allowable_opovov.label}
              </label>
              <input
                type="text"
                name={formData.standard_allowable_opovov.key}
                value={formData.standard_allowable_opovov.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="w-full">
              <label className="text-gray-700">
                {formData.electoral_district_drawing_responsibility.label}
              </label>
              <input
                type="text"
                name={formData.electoral_district_drawing_responsibility.key}
                value={formData.electoral_district_drawing_responsibility.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="w-full">
              <label className="text-gray-700">
                {formData.electoral_district_frequency.label}
              </label>
              <input
                type="number"
                placeholder="Years"
                name={formData.electoral_district_frequency.key}
                value={formData.electoral_district_frequency.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="w-full">
              <label className="text-gray-700">
                {formData.electoral_district_for_minority.label}
                {/* <Required /> */}
              </label>
              <select
                name={formData.electoral_district_for_minority.key}
                value={formData.electoral_district_for_minority.value}
                className="block text-base py-3 px-4 w-full border outline-none"
                onChange={(e) => handleInputChange(e)}
              >
                {yesNoList.map((input, idx) => (
                  <option key={idx} value={input}>
                    {input}
                  </option>
                ))}
              </select>
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
          <div onClick={handleButton}>
            <BTNSolid className="w-full">{btnLabel}</BTNSolid>
          </div>
        </div>
      </div>
    </>
  );
}

// UploadData Page
export default function UploadData() {
  const history = useHistory();
  // Scroll to top on first load
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isLogin()) {
      history.push(hashRouterList.signIn);
    }
  }, [history]);

  return (
    <div className="bg-primary-grayLight h-full py-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white shadow-md p-8 mx-8">
          <UploadDataContent />
        </div>
      </div>
      <MarginSpace />
    </div>
  );
}
