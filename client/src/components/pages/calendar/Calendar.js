import { useEffect, useContext } from "react";
import AuthContext from "../../../context/auth/authContext";
import CSteps from "./CSteps";
import Manager from "./manager/Manager";
import WSteps from "./WSteps";

const Calendar = () => {
  //init auth context
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
  }, []);
  return (
    <div className='row ' style={{ height: 300 }}>
      <div>
        <Manager />
      </div>
      <div className='col-lg-6 card py-2'>
        <div className='alert alert-primary' role='alert'>
          Building Steps
        </div>
        <CSteps />
      </div>
      <div className='col-lg-6 card py-2'>
        <div className='alert alert-info' role='alert'>
          WaterTower Steps
        </div>
        <WSteps />
      </div>
    </div>
  );
};

export default Calendar;
