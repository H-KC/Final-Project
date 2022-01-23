import React, { useContext } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import BuildingContext from "../../../context/building/buildingContext";

const ExpBuilding = () => {
  const buildingContext = useContext(BuildingContext);
  const { buildings } = buildingContext;
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "company", headerName: "Company", width: 200 },
    { field: "budget", headerName: "Budget", type: "number", width: 150 },
    { field: "startDate", headerName: "Start Date", width: 140 },
    { field: "endDate", headerName: "End Date", width: 140 },
    { field: "bstate", headerName: "State", width: 180 },
    { field: "currentStep", headerName: "CurrentStep", width: 140 },
  ];

  const rows = buildings.map((elt) => elt);
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  return (
    <div style={{ height: 340, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};

export default ExpBuilding;
