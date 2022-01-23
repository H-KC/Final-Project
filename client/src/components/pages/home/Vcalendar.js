import React, { Fragment, useContext } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import ExpenseContext from "../../../context/expenses/expenseContext";

const Vcalendar = ({ label, color, letter }) => {
  const expenseContext = useContext(ExpenseContext);
  const { expenses } = expenseContext;
  const data = expenses.map((expense) => {
    return { day: expense.date.split("T")[0], value: expense.amount };
  });
  return (
    <Fragment>
      <Chip color={color} avatar={<Avatar>{letter}</Avatar>} label={label} />
      <ResponsiveCalendar
        data={data}
        from={new Date().getFullYear() + "-01-01"}
        to={new Date().getFullYear() + "-12-31"}
        emptyColor='#eeeeee'
        colors={["#61cdbb", "#f47560"]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor='#ffffff'
        dayBorderWidth={2}
        dayBorderColor='#ffffff'
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </Fragment>
  );
};

export default Vcalendar;
