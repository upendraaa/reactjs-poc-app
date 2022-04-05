import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { DummyJSON } from './DummyJsonData';
import { Button } from '@mui/material';

export const ExportToExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
      const t1 = (new Date()).getMilliseconds();
      console.log("Start Time "+ t1)
    const ws = XLSX.utils.json_to_sheet(DummyJSON);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    console.log("Total time "+ ((new Date()).getMilliseconds() - t1))

  };

  return (
    <Button onClick={(e) => exportToCSV(apiData, fileName)}>Export</Button>
  );
};