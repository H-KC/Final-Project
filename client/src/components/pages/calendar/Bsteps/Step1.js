import { useContext } from "react";
import { FormGroup } from "reactstrap";
import BuildingContext from "../../../../context/building/buildingContext";
import { Button } from "react-bootstrap";
const Step1 = ({ step1, currentStep, handleChange, building }) => {
  // init building context
  const buildingContext = useContext(BuildingContext);
  const { buildings } = buildingContext;

  if (currentStep !== 2) {
    return null;
  }
  let { startDate, endDate } = buildings.filter(
    (buil) => buil.name === building
  )[0];

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
              name='1startDate'
              placeholder=''
              value={step1.startDate}
              required
              onChange={handleChange}
              min={startDate}
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
              name='1endDate'
              min={step1.startDate || startDate}
              max={endDate}
              onChange={handleChange}
            />
          </div>
        </div>
      </FormGroup>
    </>
  );
};

export default Step1;
