import React, { useContext } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import WaterTowerContext from "../../../context/waterTower/waterTowerContext";

const ExpWatertower = () => {
  const waterTowerContext = useContext(WaterTowerContext);
  const { watertowers } = waterTowerContext;
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
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  const rows = watertowers.map((elt) => elt);

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

export default ExpWatertower;
