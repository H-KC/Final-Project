import { ResponsivePie } from "@nivo/pie";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import BuildingContext from "../../../context/building/buildingContext";
import WaterTowerContext from "../../../context/waterTower/waterTowerContext";
import { useContext } from "react";

const Bchar = ({ label, color, letter }) => {
  // init the buildingContext
  const waterTowerContext = useContext(WaterTowerContext);
  const { watertowers } = waterTowerContext;

  const { progress, paused, finished, New, total } =
    extractNumbers(watertowers);

  const data = [
    {
      id: "Finished",
      label: "Finished",
      value: finished,
      color: "hsl(2, 70%, 50%)",
    },
    {
      id: "Paused",
      label: "Paused",
      value: paused,
      color: "hsl(145, 70%, 50%)",
    },
    {
      id: "Total",
      label: "Total",
      value: total,
      color: "hsl(106, 70%, 50%)",
    },
    {
      id: "New",
      label: "New",
      value: New,
      color: "hsl(106, 70%, 50%)",
    },
    {
      id: "InProgress",
      label: "In Progress",
      value: progress,
      color: "hsl(106, 70%, 50%)",
    },
  ];

  return (
    <>
      <Chip color={color} avatar={<Avatar>{letter}</Avatar>} label={label} />
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor='#333333'
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};

const extractNumbers = (data) => {
  let progress = 0;
  let paused = 0;
  let finished = 0;
  let New = 0;
  data.map(({ bstate }) => {
    if (bstate === "finished") finished = finished + 1;
    if (bstate === "inProgress") progress = progress + 1;
    if (bstate === "paused") paused = paused + 1;
    if (bstate === "new") New = New + 1;
  });
  let total = paused + progress + New + finished;
  return { progress, paused, finished, New, total };
};
export default Bchar;
