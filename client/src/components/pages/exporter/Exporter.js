import React from "react";
import ExpBuilding from "./ExpBuilding";
import ExpWatertower from "./ExpWatertower";

const exporter = () => {
  return (
    <div className='container'>
      {/* buildings */}
      <div className='col-lg-12'>
        <div className='alert alert-primary text-center ' role='alert'>
          <h3 className='h3'>Buldings</h3>
        </div>
        <ExpBuilding />
      </div>
      {/* waterTowers */}
      <div className='col-lg-12 mt-2'>
        <div className='alert alert-primary text-center ' role='alert'>
          <h3 className='h3'>WaterTowers</h3>
        </div>
        <ExpWatertower />
      </div>
    </div>
  );
};

export default exporter;
