import { useContext, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import CompanyContext from "../../../context/companies/companyContext";
import BuildingContext from "../../../context/building/buildingContext";
import WaterTowerContext from "../../../context/waterTower/waterTowerContext";
import toast from "react-hot-toast";

const CTable = () => {
  // init buildingContext
  const buildingContext = useContext(BuildingContext);
  const { buildings } = buildingContext;
  // init the waterTowerContext
  const waterTowerContext = useContext(WaterTowerContext);
  const { watertowers } = waterTowerContext;
  // init companyContext
  const companyContext = useContext(CompanyContext);
  const { companies, deleteCompany, setCurrent, setStats, getCompanies } =
    companyContext;
  useEffect(() => {
    getCompanies();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Company Name", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "creationDate", headerName: "Creation Date", width: 200 },
    { field: "newProjects", headerName: "New Projects", width: 180 },
    { field: "pausedProjects", headerName: "Paused Projects", width: 180 },
    { field: "finishedProjects", headerName: "Finished Projects", width: 180 },
    {
      field: "inProgessProjects",
      headerName: "InProgess Projects",
      width: 200,
    },
  ];
  const updateStats = () => {
    for (let i = 0; i < companies.length; i++) {
      let holder = companies[i];
      //setting new projects
      holder.newProjects =
        buildings.filter(
          (building) =>
            building.company === holder.name && building.bstate === "new"
        ).length +
        watertowers.filter(
          (waterTower) =>
            waterTower.company === holder.name && waterTower.bstate === "new"
        ).length;
      //setting inprogress projects
      holder.inProgessProjects =
        buildings.filter(
          (building) =>
            building.company === holder.name && building.bstate === "inProgress"
        ).length +
        watertowers.filter(
          (waterTower) =>
            waterTower.company === holder.name &&
            waterTower.bstate === "inProgress"
        ).length;
      //setting paused projects
      holder.pausedProjects =
        buildings.filter(
          (building) =>
            building.company === holder.name && building.bstate === "paused"
        ).length +
        watertowers.filter(
          (waterTower) =>
            waterTower.company === holder.name && waterTower.bstate === "paused"
        ).length;

      //setting finished projects
      holder.finishedProjects =
        buildings.filter(
          (building) =>
            building.company === holder.name && building.bstate === "finished"
        ).length +
        watertowers.filter(
          (waterTower) =>
            waterTower.company === holder.name &&
            waterTower.bstate === "finished"
        ).length;

      //returning the id of buildings
      holder.buildingsID = buildings
        .filter((building) => {
          if (building.company === holder.name) {
            return building;
          } else {
            return false;
          }
        })
        .map((building) => building.id);
      // return id of watertower ids
      holder.waterTowerID = watertowers
        .filter((watertower) => {
          if (watertower.company === holder.name) {
            return watertower;
          } else {
            return false;
          }
        })
        .map((watertower) => watertower.id);

      setStats(holder);
    }
  };

  useEffect(() => {
    updateStats();
  }, [buildings]);
  const rows = companies;
  const handleClick = (e) => setCurrent(e.row);
  const handleDelete = (e) => {
    deleteCompany(e.row.id);
    toast.success("Successfully Deleted!");
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        onCellClick={handleClick}
        onCellDoubleClick={handleDelete}
      />
    </div>
  );
};

export default CTable;
