import { DataGrid } from "@material-ui/data-grid";

const Table = ({ name, data }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: name, width: 240 },
    { field: "company", headerName: "Company", width: 240 },
    { field: "budget", headerName: "Budget", type: "number", width: 150 },
    { field: "startDate", headerName: "Start Date", width: 190 },
    { field: "endDate", headerName: "End Date", width: 180 },
    { field: "bstate", headerName: "State", width: 180 },
  ];

  const rows = data.filter((elt) => elt.bstate != "finished").map((elt) => elt);

  return (
    <div style={{ height: 340, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
};

export default Table;
