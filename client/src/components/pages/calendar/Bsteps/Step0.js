import React, { useContext } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import BuildingContext from "../../../../context/building/buildingContext";

const Step1 = (props) => {
  // init building context
  const buildingContext = useContext(BuildingContext);
  const { buildings } = buildingContext;
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <>
      <FormGroup>
        <Label for='building'>Choose a Building</Label>
        <select
          name='building'
          className='custom-select py-3 mx-2 '
          value={props.building}
          onChange={props.handleChange}
        >
          <option defaultValue value=''>
            Choose a Building..
          </option>
          {buildings
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

export default Step1;
