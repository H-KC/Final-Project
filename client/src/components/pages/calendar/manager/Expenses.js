import React from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

const Expenses = ({ expenses }) => {
  //   console.log(expenses);
  return (
    <ListGroup
      style={{
        maxHeight: "360px",
        marginBottom: "10px",
        overflow: "scroll",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <ListGroup.Item variant='primary'>Project Expenses</ListGroup.Item>
      {expenses.map((expense) => {
        return (
          <ListGroup.Item key={expense.id}>
            <span>{expense.description} : </span>
            <span
              style={{
                backgroundColor: "#3F51B5",
                color: "white",
                padding: 4,
                marginLeft: "auto",
                width: "110px",
                float: "right",
                textAlign: "center",
              }}
            >
              {expense.amount}
            </span>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default Expenses;
