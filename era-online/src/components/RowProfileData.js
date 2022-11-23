import React from "react";
import { constProfileData, getCountry } from "../constants/formData";

export default function RowProfileData({ data }) {
  const rowData = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const eProfile = data[key];
      if (eProfile.row) {
        rowData.push(
          <div key={key} className="grid grid-cols-2">
            <div className="font-medium">{eProfile.label}</div>
            {key === constProfileData.country.key ? (
              <div className="pl-4">{": " + getCountry(eProfile.value)}</div>
            ) : (
              <div className="pl-4">{": " + eProfile.value}</div>
            )}
          </div>
        );
      }
    }
  }
  return (
    <>
      <div className="space-y-4 mt-4">
        <p className="font-bold tracking-wide underline">
          {data.title.value +
            " " +
            data.first_name.value +
            " " +
            data.last_name.value}
        </p>
        <div className="text-sm space-y-2">{rowData}</div>
      </div>
    </>
  );
}
