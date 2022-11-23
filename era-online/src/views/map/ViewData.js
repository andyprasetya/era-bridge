import React from "react";
import { useParams, Link as LinkRouter } from "react-router-dom";
import { strLang } from "../../functions/language";
import { hashRouterList } from "../../constants/routes";
import L from "leaflet";
import MarginSpace from "../../components/Margin";
import { detailData } from "../../actions/data";
import {
  constFormDataERA,
  constFormDataERAType,
  constOtherKey,
  constParams,
  constProfileData,
  getCountry,
} from "../../constants/formData";
import { apiURL } from "../../constants/apiURL";
import { rgbToHex } from "../../functions/rgbToHex";
import * as turf from "@turf/turf";
import { BTNSolid } from "../../components/Button";
import Table from "../../components/Table";
import { numberWithCommas } from "../../functions/numberWithCommas";
import Loading from "../../components/Loading";

// Row Data content
function RowDataContent({ data }) {
  function iterateRow() {
    const rowData = [];
    for (const key in constFormDataERA) {
      if (key === constFormDataERA.spatial_data.key) {
        continue;
      }
      if (data.hasOwnProperty(key)) {
        rowData.push(
          <div key={key} className="mb-4">
            <div className="font-normal text-sm text-gray-700 whitespace-pre-wrap">
              {constFormDataERA[key].label}
            </div>
            <div className="font-medium">
              {key === constFormDataERA.country.key ? (
                getCountry(data[key])
              ) : key === constFormDataERA.copyright_holder.key &&
                data[key] !== "" ? (
                <a
                  href={apiURL.dataLocation + data[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary-orangeDark"
                >
                  {strLang.btn_open}
                  {}
                </a>
              ) : (
                <div className="font-medium">{data[key]}</div>
              )}
            </div>
          </div>
        );
      }
    }
    return rowData;
  }
  return <>{iterateRow()}</>;
}

// ViewData content
function ViewDataContent({ data }) {
  if (!data[constFormDataERA.spatial_data.key]) {
    return <div>{strLang.msg_no_data}</div>;
  }
  const fileName = data[constFormDataERA.spatial_data.key];

  function imageFormat(fName) {
    const imgFormat = constFormDataERAType[2].format;
    for (let i = 0; i < imgFormat.length; i++) {
      if (fName.toLowerCase().endsWith(imgFormat[i])) {
        return (
          <img
            src={apiURL.dataLocation + fName}
            className="w-full max-h-screen object-contain"
            alt={data[constFormDataERA.title.key]}
          />
        );
      }
    }
    return <div>{strLang.msg_no_data}</div>;
  }

  return (
    <>
      {fileName.toLowerCase().endsWith(constFormDataERAType[0].format[0]) ? (
        <MapContent data={data} />
      ) : fileName.toLowerCase().endsWith(constFormDataERAType[1].format[0]) ? (
        <iframe
          title="pdf-map"
          src={apiURL.dataLocation + fileName}
          width="100%"
          height="100%"
        />
      ) : (
        imageFormat(fileName)
      )}
    </>
  );
}

const generalKey = [
  { label: "Total Populations", key: "totalpopulation" },
  { label: "Parliament Seats (Input)", key: "parliament_seats" },
  { label: "Parliament Seats (Output)", key: "parliament_seats_output" },
  { label: "Minimum Seat Allocation", key: "minimum_seats" },
  { label: "Maximum Seat Allocation", key: "maximum_seats" },
  { label: "Standard Deviation", key: "stddev", keyShow: "xstddev_ignore" },
];

const initialMapDataColumn = [
  {
    Header: "Electoral District",
    accessor: "electoral_district",
  },
  {
    Header: "District Quota",
    accessor: "district_xcalc_sq",
  },
  {
    Header: "Seat Allocation",
    accessor: "district_xcalc_round",
  },
  {
    Header: "Rems.",
    accessor: "district_xcalc_remain",
  },
  {
    Header: "Admin. Unit",
    accessor: "xareaname",
  },
  {
    Header: "Population",
    accessor: "xarea_population",
  },
  {
    Header: "Quota",
    accessor: "xcalc_sq",
  },
  {
    Header: "Quota (Rounded)",
    accessor: "xcalc_round",
  },
];

function RowDataGeneral({ data }) {
  const rowData = [];
  generalKey.forEach((item, idx) => {
    if (item.keyShow) {
      if (data[item.keyShow] === "1") {
        return;
      }
    }
    rowData.push(
      <div key={idx} className="grid grid-cols-2">
        <div className="font-medium">{item.label}</div>
        <div className="pl-4">{": " + numberWithCommas(data[item.key])}</div>
      </div>
    );
  });
  return (
    <>
      <div className="space-y-4 mt-4">
        <div className="text-sm space-y-2">{rowData}</div>
      </div>
    </>
  );
}

// map content
function MapContent({ data }) {
  const map = React.useRef(null);
  const [openTable, setOpenTable] = React.useState(true);
  const [dataJSON, setDataJSON] = React.useState({});
  const [dataTable, setDataTable] = React.useState([]);

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
      const data = await fetch(geojson).then((out) => out.json());
      try {
        data.parliament_seats_output = 0;
        data.features.forEach((feature) => {
          if (feature.properties["is_redistricted"] === "1") {
            data.parliament_seats_output += parseInt(
              feature.properties.xcalc_round
            );
          }
        });
        setDataJSON(data);
      } catch {}

      try {
        const dataFeatures = data.features;
        const allPoint = [];
        for (let i = 0; i < dataFeatures.length; i++) {
          const iData = dataFeatures[i].properties.electoral_district;
          allPoint.push(iData);
        }

        const uniquePoints = [...new Set(allPoint)];
        const pointCollection = [];
        uniquePoints.forEach((electoral_district) => {
          for (let i = 0; i < dataFeatures.length; i++) {
            const iData = dataFeatures[i];
            if (iData.properties.electoral_district === electoral_district) {
              if (!iData.properties.centroid) continue;
              const point = turf.point(iData.properties.centroid.coordinates, {
                electoral_district: electoral_district,
                district_xcalc_round: iData.properties.district_xcalc_round,
              });
              pointCollection.push(point);
              break;
            }
          }
        });

        // Buffer layer for electoral name
        const features = turf.featureCollection(pointCollection);
        const buffered = turf.buffer(features, 1, { units: "kilometers" });
        L.geoJSON(buffered, {
          style: function (feature) {
            return {
              weight: 1.5,
              opacity: 0.75,
              fillOpacity: 0.5,
              color: "black",
            };
          },
          onEachFeature: function (feature, layer) {
            let label = feature.properties.electoral_district
              ? feature.properties.electoral_district
              : "";
            for (let i = 0; i < dataFeatures.length; i++) {
              const iData = dataFeatures[i];
              if (
                iData.properties.electoral_district ===
                feature.properties.electoral_district
              ) {
                label += "<br/>[" + iData.properties.district_xcalc_round + "]";
                break;
              }
            }

            layer.bindTooltip(label, {
              permanent: true,
              direction: "center",
              className: "no-background text-base",
            });
          },
        }).addTo(map.current);
      } catch {
        alert(strLang.msg_wrong_file_format_json);
      }

      try {
        const mLayer = L.geoJSON(data, {
          style: function (feature) {
            return {
              fillColor: rgbToHex(
                feature.properties.fill_red_channel,
                feature.properties.fill_green_channel,
                feature.properties.fill_blue_channel
              ),
              weight: feature.properties.stroke_width
                ? parseFloat(feature.properties.stroke_width)
                : 1,
              opacity: feature.properties.stroke_alpha_channel
                ? parseFloat(feature.properties.stroke_alpha_channel)
                : 1,
              fillOpacity: feature.properties.fill_alpha_channel
                ? parseFloat(feature.properties.fill_alpha_channel)
                : 1,
              color: rgbToHex(
                feature.properties.stroke_red_channel,
                feature.properties.stroke_green_channel,
                feature.properties.stroke_blue_channel
              ),
            };
          },
          onEachFeature: function (feature, layer) {
            layer.bindTooltip(
              feature.properties.xareaname ? feature.properties.xareaname : "",
              {
                permanent: false,
                direction: "center",
                className: "no-background font-normal",
              }
            );
          },
        })
          .bindPopup(
            function (layer) {
              const props = layer.feature.properties;
              let popup = "";
              for (const key in props) {
                popup += key + " : " + props[key] + "<br/>";
              }
              return popup;
            },
            {
              maxHeight: 200,
            }
          )
          .addTo(map.current);
        map.current.fitBounds(mLayer.getBounds());
      } catch {}
    }
    loadLayer(apiURL.dataLocation + data[constFormDataERA.spatial_data.key]);
  });

  React.useEffect(() => {
    let uniqueDistrict = [];
    const mData = [];
    if (!dataJSON.features) return;
    dataJSON.features.forEach((feature) => {
      const props = feature.properties;
      uniqueDistrict.push(props["electoral_district"]);
    });
    uniqueDistrict = [...new Set(uniqueDistrict)];

    function createList(objData) {
      return (
        <ul>
          {objData.map((obj, idx) => (
            <li key={idx + "-" + obj}>{obj}</li>
          ))}
        </ul>
      );
    }

    uniqueDistrict.forEach((district) => {
      const objData = {
        electoral_district: district,
        xareaname: [],
        xarea_population: [],
        xcalc_sq: [],
        xcalc_round: [],
      };
      dataJSON.features.forEach((feature) => {
        const props = feature.properties;
        if (props["electoral_district"] === district) {
          objData.xareaname.push(props.xareaname);
          objData.xarea_population.push(
            numberWithCommas(props.xarea_population)
          );
          objData.xcalc_sq.push(props.xcalc_sq);
          objData.xcalc_round.push(props.xcalc_round);
          if (props["is_redistricted"] === "1") {
            objData.district_xcalc_sq = props.district_xcalc_sq;
            objData.district_xcalc_round = props.district_xcalc_round;
            objData.district_xcalc_remain = props.district_xcalc_remain;
          }
        }
      });
      objData.xareaname = createList(objData.xareaname);
      objData.xarea_population = createList(objData.xarea_population);
      objData.xcalc_sq = createList(objData.xcalc_sq);
      objData.xcalc_round = createList(objData.xcalc_round);
      mData.push(objData);
    });
    setDataTable(mData);
  }, [dataJSON]);

  return (
    <div className="relative">
      <div id="map" className="w-full z-10 h-screen" />
      <div className="absolute right-2 top-2 z-10 border border-primary-grayDark bg-opacity-90 bg-primary-grayDark">
        <div className="items-center space-y-2">
          <div className="flex justify-end">
            <div
              onClick={() => {
                setOpenTable(!openTable);
              }}
            >
              <BTNSolid size="small">{strLang.btn_table}</BTNSolid>
            </div>
          </div>
          {openTable && (
            <div
              className="bg-white p-4 max-w-xl overflow-y-auto"
              style={{ maxHeight: "650px" }}
            >
              <Table initialColumn={initialMapDataColumn} data={dataTable} />
              <RowDataGeneral data={dataJSON} />
            </div>
          )}
        </div>
      </div>
      {!dataJSON.features && <Loading />}
    </div>
  );
}

// ViewData Page
export default function ViewData() {
  const params = useParams();
  const [data, setData] = React.useState({});
  // Scroll to top on first load
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    async function getMapData() {
      const response = await detailData(params[constParams.id]);
      if (response.status === 200) {
        setData(response.json.data);
      }
    }
    getMapData();
  }, [params]);

  return (
    <div className="bg-primary-grayLight h-full py-8">
      <div className="w-full mx-auto">
        <div className="bg-white shadow-md p-8 mx-8 gap-x-2 grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-4">
          <div className="col-span-1 overflow-auto max-h-screen">
            <h1 className="text-primary-blue text-xl font-serif font-bold leading-normal mb-4 text-center bg-primary-grayLight">
              {strLang.title_view_data}
            </h1>
            <div className="text-primary-blue text-sm font-serif mb-4 bg-gray-100">
              <p>
                {strLang.input_uploaded_at +
                  " : " +
                  data[constProfileData.created_at.key]}
              </p>
              <p>
                {strLang.title_user + " : "}
                <LinkRouter
                  to={hashRouterList.user + "/" + data[constOtherKey.userID]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary-orangeDark"
                >
                  {data.first_name + " " + data.last_name}
                </LinkRouter>
              </p>
              <p>{strLang.title_status + " : " + data[constOtherKey.status]}</p>
            </div>
            <RowDataContent data={data} />
          </div>
          <div className="col-span-3 border border-primary-orange max-h-screen">
            <ViewDataContent data={data} />
          </div>
        </div>
      </div>
      <MarginSpace />
      {!data[constFormDataERA.title.key] && <Loading />}
    </div>
  );
}
