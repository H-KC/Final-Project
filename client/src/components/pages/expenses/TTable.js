import React, { useContext, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import ExpenseContext from "../../../context/expenses/expenseContext";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "description", headerName: "Description", width: 180 },
  { field: "projectid", headerName: "PR ID", width: 120 },
  { field: "projectName", headerName: "Project Name", width: 180 },
  { field: "date", headerName: "Date", width: 150 },
  { field: "type", headerName: "Type", width: 150 },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 110,
  },
  {
    field: "budget",
    headerName: "Budget",
    type: "number",
    width: 110,
  },
  {
    field: "exp",
    headerName: "Result",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue("budget") - params.getValue("amount") || ""}`,
  },
];

const DTable = () => {
  const expenseContext = useContext(ExpenseContext);
  const { expenses, getExpenses } = expenseContext;

  useEffect(() => {
    getExpenses();
  }, []);

  let rows = expenses.map((expense) => {
    return {
      id: expense.id,
      description: expense.description,
      projectid: expense.projectid,
      projectName: expense.projectName,
      date: expense.date.split("T")[0],
      type: expense.type,
      amount: expense.amount,
      budget: expense.budget,
    };
  });
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};

export default DTable;
