import CTable from "./CTable";
import FormCompnies from "./FormCompnies";
import Stats from "./Stats";

import AuthContext from "../../../context/auth/authContext";
import { useContext, useEffect } from "react";

const Companies = () => {
  // //init auth context
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
  }, []);

  return (
    <div className=''>
      <div className='row ' style={{ height: 300 }}>
        {/* the form of companies */}
        <div className='col-lg-6 col-sm-12'>
          <FormCompnies />
        </div>
        {/* stats of companies */}
        <div className='col-lg-6 col-sm-12'>
          <Stats />
        </div>
        <div className='col-lg-12 mt-4'>
          {/* table of companies */}
          <CTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
