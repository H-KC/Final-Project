import { useContext, useEffect } from "react";
import AuthContext from "../../../context/auth/authContext";
import ProjectForm from "./ProjectForm";
import ProjectTable from "./ProjectTable";
import WaterTowerForm from "./WaterTowerForm";
import WaterTowerTable from "./WaterTowerTable";

const Project = () => {
  //init auth context
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
  }, [authContext.isAuthenticated]);
  return (
    <div className='row ' style={{ height: 300 }}>
      <div className='col-lg-6 card pt-2'>
        <ProjectForm />
      </div>
      <div className='col-lg-6 card pt-2'>
        <WaterTowerForm />
      </div>
      <div className='col-lg-6 mt-3 card pt-3'>
        <ProjectTable />
      </div>
      <div className='col-lg-6 mt-3 card pt-3'>
        <WaterTowerTable />
      </div>
    </div>
  );
};

export default Project;
