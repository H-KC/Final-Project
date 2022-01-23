import React, { Fragment, useContext, useEffect } from "react";
import "./style.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
import WaterTowerContext from "../../../context/waterTower/waterTowerContext";
import toast from "react-hot-toast";

const WaterTowerTable = () => {
  // init the waterTowerContext
  const waterTowerContext = useContext(WaterTowerContext);
  const { watertowers, deleteWaterTower, setCurrent, getWaterTowers } =
    waterTowerContext;

  useEffect(() => {
    getWaterTowers();
  }, []);
  //handleDelet waterTower
  const handleDelete = (id) => {
    deleteWaterTower(id);
    toast.success("Successfully Deleted");
  };
  //handleUpdate waterTower
  const handleUpdate = (id) => {
    setCurrent(id);
    toast.success("WaterTower in update", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
      iconTheme: {
        primary: "#713200",
        secondary: "#FFFAEE",
      },
    });
  };
  return (
    <Fragment>
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Budget</th>
            <th scope='col'>Company</th>
            <th scope='col'>StartDate</th>
            <th scope='col'>EndDate</th>
            <th scope='col'>State</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {watertowers.map(
            (
              { id, name, budget, company, startDate, endDate, bstate },
              index
            ) => {
              return (
                <tr key={id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{name}</td>
                  <td>{budget}</td>
                  <td>{company}</td>
                  <td>{startDate}</td>
                  <td>{endDate}</td>
                  <td>{bstate}</td>
                  <td>
                    <DropdownButton
                      id='dropdown-basic-button'
                      title='More'
                      size='sm'
                    >
                      <Dropdown.Item
                        onClick={() => handleUpdate(watertowers[index])}
                      >
                        Update
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(id)}>
                        Delete
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Fragment>
  );
};

export default WaterTowerTable;
