import { useEffect, useContext } from "react";
import DForm from "./DForm";
import TTable from "./TTable";
import TForm from "./TForm";
import AuthContext from "../../../context/auth/authContext";

const Expenses = () => {
  //init auth context
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
  }, []);
  return (
    <div className='row ' style={{ height: 300 }}>
      <div className='col-lg-6 col-sm-12'>
        <DForm />
      </div>
      <div className='col-lg-6 col-sm-12'>{<TForm />}</div>
      <div className='col-lg-12 mt-4'>
        <TTable />
      </div>
    </div>
  );
};

export default Expenses;
