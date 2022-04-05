import Spreadsheet from "react-spreadsheet";

export const SpreadSheet = () => {
  const data = [
    [{ value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ];
  return <Spreadsheet data={data} />;
};

