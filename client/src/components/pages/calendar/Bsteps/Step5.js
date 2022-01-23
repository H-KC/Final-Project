import { useContext } from "react";
import { Button } from "react-bootstrap";

import { FormGroup } from "reactstrap";
import BuildingContext from "../../../../context/building/buildingContext";

const Step5 = ({ step1, currentStep, handleChange, building }) => {
  // init building context
  const buildingContext = useContext(BuildingContext);
  const { buildings } = buildingContext;
  let date = buildings.filter((buil) => buil.name === building);
  let endDate = date.length > 0 ? date[0].endDate : "";

  if (currentStep !== 6) {
    return null;
  }

  return (
    <>
      <Button variant='outline-success' className='my-4'>
        {step1.title}
      </Button>
      <FormGroup>
        <div className='row '>
          <div className='col-md-4 mb-3'>
            <label>Start Date</label>
            <input
              type='date'
              className='form-control'
              name='5startDate'
              placeholder=''
              value={step1.startDate}
              required
              onChange={handleChange}
              min={step1.startDate}
              max={endDate}
            />
          </div>
          <div className='col-md-4 mb-3'>
            <label>End Date</label>
            <input
              type='date'
              className='form-control'
              value={step1.endDate}
              required
              name='5endDate'
              min={step1.startDate}
              onChange={handleChange}
              max={endDate}
            />
          </div>
        </div>
      </FormGroup>
    </>
  );
};

export default Step5;
