import React, { Fragment, useContext } from "react";
import { ResponsiveBar } from "@nivo/bar";
import CompanyContext from "../../../context/companies/companyContext";
const Stats = () => {
  const companyContext = useContext(CompanyContext);
  const { companies } = companyContext;
  const hol = companies
    .map(
      (item, index) =>
        index < 5 && {
          name: item.name,
          New: item.newProjects,
          Paused: item.pausedProjects,
          Finished: item.finishedProjects,
          InProgress: item.inProgessProjects,
        }
    )
    .filter((item) => item);

  const data = hol.map((company) => {
    return {
      Company: company.name,
      New: company.New,
      "hot dogColor": "hsl(198, 70%, 50%)",
      Paused: company.Paused,
      burgerColor: "hsl(142, 70%, 50%)",
      InProgress: company.InProgress,
      sandwichColor: "hsl(22, 70%, 50%)",
      Total:
        company.InProgress + company.Finished + company.Paused + company.New,
      kebabColor: "hsl(102, 70%, 50%)",
      Finished: company.Finished,
      friesColor: "hsl(168, 70%, 50%)",
    };
  });

  return (
    <Fragment>
      <ResponsiveBar
        data={data}
        keys={["New", "Paused", "InProgress", "Finished", "Total"]}
        indexBy='Company'
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "Total",
            },
            id: "dots",
          },
          {
            match: {
              id: "InProgress",
            },
            id: "lines",
          },
        ]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "TOP 5 COMPANIES",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Projects",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </Fragment>
  );
};

export default Stats;
