import React, { Fragment, useContext, useEffect } from "react";
import BuildingContext from "../../../context/building/buildingContext";
import "./style.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
import toast from "react-hot-toast";

const ProjectTable = () => {
  // init the buildingContext
  const buildingContext = useContext(BuildingContext);
  const {
    buildings,
    deleteBuilding,
    setCurrent,
    current,
    clearCurrent,
    getBuildings,
  } = buildingContext;
  useEffect(() => {
    getBuildings();
  }, []);
  //handleDelet building
  const handleDelete = (id) => {
    if (current !== null) {
      current.id === id && clearCurrent();
    }
    deleteBuilding(id);
    toast.success("Successfully Deleted");
  };

  //handleUpdate building
  const handleUpdate = (id) => {
    setCurrent(id);
    toast.success("Building in update", {
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
          {buildings.map(
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
                        onClick={() => handleUpdate(buildings[index])}
                      >
                        update
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(id)}>
                        delete
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

export default ProjectTable;
