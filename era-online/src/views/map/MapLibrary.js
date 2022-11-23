import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { strLang } from "../../functions/language";
import { hashRouterList } from "../../constants/routes";
import MarginSpace from "../../components/Margin";
import L from "leaflet";
import WorldBoundary from "../../data/geojson/country_pl.geojson";
import {
  cloneObject,
  constFormData,
  constFormDataERA,
  constOtherKey,
  constProfileData,
  getCountry,
} from "../../constants/formData";
import Table from "../../components/Table";
import { listDataPublic } from "../../actions/data";
import { BTNSolid } from "../../components/Button";
import Loading from "../../components/Loading";

// MapLibrary content
function MapContent({ data }) {
  const map = React.useRef(null);
  const [baseLayer, setBaseLayer] = React.useState(null);
  React.useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = L.map("map", {
      center: [-2.342, 114.1324],
      zoom: 5,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });
    async function loadLayer(geojson) {
      const dataJson = await fetch(geojson).then((out) => out.json());
      const baseLyr = L.geoJSON(dataJson, {
        style: function (feature) {
          return {
            fillColor: "#fff",
            weight: 1,
            opacity: 0.5,
            fillOpacity: 0.3,
            color: "black",
          };
        },
        onEachFeature: function (feature, layer) {
          layer.bindTooltip(feature.properties.NAME, {
            permanent: false,
            direction: "center",
            className: "no-background",
          });
        },
      }).addTo(map.current);
      map.current.fitBounds(baseLyr.getBounds());
      setBaseLayer(baseLyr);
    }
    loadLayer(WorldBoundary);
  });

  function setBaseLayerData(mData, mLayer) {
    const uniqueCountry = [...new Set(mData.map((item) => item.country))];
    const dataCountry = {};
    for (let i = 0; i < uniqueCountry.length; i++) {
      const count = mData.filter(
        (item) => item.country === uniqueCountry[i]
      ).length;
      dataCountry[uniqueCountry[i]] = count;
    }

    mLayer.eachLayer((layer) => {
      // Only gave popup and setting to available country data
      if (dataCountry[layer.feature.properties.ISO_A3]) {
        layer.bindTooltip(
          layer.feature.properties.NAME +
            "<br/>" +
            dataCountry[layer.feature.properties.ISO_A3],
          {
            direction: "center",
            className: "no-background",
          }
        );

        layer.setStyle({
          fillColor: "red",
          fillOpacity: 0.1 + dataCountry[layer.feature.properties.ISO_A3] / 10,
        });

        layer.bindPopup(
          function (layer) {
            let popupHTML =
              "<strong>" +
              layer.feature.properties.NAME +
              " (" +
              dataCountry[layer.feature.properties.ISO_A3] +
              ")</strong><br/>";

            for (let i = 0; i < mData.length; i++) {
              if (mData[i].country === layer.feature.properties.ISO_A3) {
                popupHTML += "<br/>";
                popupHTML +=
                  "<a href='#" +
                  hashRouterList.viewData +
                  "/" +
                  mData[i][constOtherKey.dataID] +
                  "'";
                popupHTML += "target='_blank' rel='noopener noreferrer'>";
                popupHTML +=
                  "<button class='my-1 text-white bg-primary-orange hover:bg-primary-orangeDark px-1 focus:outline-none'>";
                popupHTML += mData[i].title;
                popupHTML += "</button>";
                popupHTML += "</a>";
              }
            }
            return popupHTML;
          },
          {
            maxHeight: 200,
          }
        );
      }
    });
  }

  React.useEffect(() => {
    // Adding data to baselayer
    if (!baseLayer) return;
    setBaseLayerData(data, baseLayer);
  }, [baseLayer, data]);

  return (
    <>
      <div id="map" className="w-full z-10" style={{ height: "550px" }} />
      {!baseLayer && <Loading />}
    </>
  );
}

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
    Header: strLang.btn_profile,
    accessor: constOtherKey.viewProfile,
  },
  {
    Header: strLang.title_user,
    accessor: constOtherKey.fullName,
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
    Header: constFormDataERA.electoral_district_level.label,
    accessor: constFormDataERA.electoral_district_level.key,
  },
  {
    Header: constFormDataERA.electoral_system_design.label,
    accessor: constFormDataERA.electoral_system_design.key,
  },
];

function MapDataTable({ dataList }) {
  const [data, setData] = React.useState(dataList);
  React.useEffect(() => {
    const mList = [];
    for (let i = 0; i < dataList.length; i++) {
      const iList = cloneObject(dataList[i]);
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
      iList[constOtherKey.fullName] =
        iList[constFormData.first_name.key] +
        " " +
        iList[constFormData.last_name.key];
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
    setData(mList);
  }, [dataList]);

  return <Table initialColumn={initialMapDataColumn} data={data} />;
}

// MapLibrary content
function ListContent({ data }) {
  return (
    <>
      <div className="my-8 border-b-2 border-primary-orange" />
      <MapDataTable dataList={data} />
      <div className="my-8 flex justify-center items-center ">
        <LinkRouter
          to={hashRouterList.uploadData}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BTNSolid className="w-full">
            {strLang.btn_publish_your_data}
          </BTNSolid>
        </LinkRouter>
      </div>
    </>
  );
}

// MapLibrary Page
export default function MapLibrary() {
  // Scroll to top on first load
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    async function getListData() {
      const response = await listDataPublic();
      if (response.status === 200) {
        setData(response.json.data);
      }
    }
    getListData();
  }, []);

  return (
    <div className="bg-primary-grayLight h-full py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md p-8 mx-8">
          <h1 className="text-primary-blue text-5xl font-serif font-bold leading-normal mt-0">
            {strLang.nav_map_library}
          </h1>
          <div className="bg-primary-grayLight bg-opacity-30 p-6 text-lg font-normal text-primary-blue leading-relaxed mb-6 max-w-6xl whitespace-pre-line">
            {strLang.map_library_desc}
          </div>
          <div className="space-y-4">
            <MapContent data={data} />
            <ListContent data={data} />
            <p className="text-center bg-primary-grayMain p-4 text-white">
              {strLang.msg_disclaimer}
            </p>
          </div>
        </div>
      </div>
      <MarginSpace />
    </div>
  );
}
