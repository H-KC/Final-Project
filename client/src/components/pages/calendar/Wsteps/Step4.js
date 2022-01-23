import { useContext } from "react";

import { FormGroup } from "reactstrap";
import WaterTowerContext from "../../../../context/waterTower/waterTowerContext";
import { Button } from "react-bootstrap";

const Step4 = ({ step1, currentStep, handleChange, waterTower }) => {
  // init waterTower context
  const waterTowerContext = useContext(WaterTowerContext);
  const { watertowers } = waterTowerContext;
  let date = watertowers.filter((buil) => buil.name === waterTower);
  let endDate = date.length > 0 ? date[0].endDate : "";

  if (currentStep !== 5) {
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
              name='4startDate'
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
              name='4endDate'
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

export default Step4;
