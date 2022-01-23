import React, { useContext } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import WaterTowerContext from "../../../../context/waterTower/waterTowerContext";

const Step0 = (props) => {
  // init waterTower context
  const waterTowerContext = useContext(WaterTowerContext);
  const { watertowers } = waterTowerContext;
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <>
      <FormGroup>
        <Label for='building'>Choose a WaterTower</Label>
        <select
          name='waterTower'
          className='custom-select py-3 mx-2 '
          value={props.waterTower}
          onChange={props.handleChange}
        >
          <option defaultValue value=''>
            Choose a WaterTower..
          </option>
          {watertowers
            .filter((building) => building.bstate === "new")
            .map((building) => {
              return (
                <option value={building.name} key={building.id}>
                  {building.name}
                </option>
              );
            })}
        </select>
      </FormGroup>
    </>
  );
};

export default Step0;
