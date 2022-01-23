import React from "react";
import { Accordion, Card } from "react-bootstrap";
import toast from "react-hot-toast";

const MWsteps = ({ steps, updateWateTowerSteps, updateBstate, updatePrb }) => {
  const handleClick = (e) => {
    const today = new Date().toJSON().slice(0, 10);
    let [id, index] = e.target.value.split("/");
    if (index === "1") {
      toast.success("Validated");
      updatePrb(steps.waterTower, "12.5%");
      console.log("ok");
      steps.step1.endDate < today
        ? updateBstate(steps.waterTower, "paused")
        : updateBstate(steps.waterTower, "inProgress");
    } else if (index === "2") {
      updatePrb(steps.waterTower, "25%");
      toast.success("Validated");

      steps.step2.endDate < today
        ? updateBstate(steps.waterTower, "paused")
        : updateBstate(steps.waterTower, "inProgress");
    } else if (index === "3") {
      updatePrb(steps.waterTower, "37.5%");
      toast.success("Validated");

      steps.step3.endDate < today
        ? updateBstate(steps.waterTower, "paused")
        : updateBstate(steps.waterTower, "inProgress");
    } else if (index === "4") {
      updatePrb(steps.waterTower, "50%");
      toast.success("Validated");

      steps.step4.endDate < today
        ? updateBstate(steps.waterTower, "paused")
        : updateBstate(steps.waterTower, "inProgress");
    } else if (index === "5") {
      updatePrb(steps.waterTower, "62.5%");
      toast.success("Validated");

      steps.step5.endDate < today
        ? updateBstate(steps.waterTower, "paused")
        : updateBstate(steps.waterTower, "inProgress");
    } else if (index === "6") {
      updatePrb(steps.waterTower, "75%");
      toast.success("Validated");

      steps.step6.endDate < today
        ? updateBstate(steps.waterTower, "paused")
        : updateBstate(steps.waterTower, "inProgress");
    } else if (index === "7") {
      updatePrb(steps.waterTower, "85%");
      toast.success("Validated");

      steps.step7.endDate < today
        ? updateBstate(steps.waterTower, "paused")
        : updateBstate(steps.waterTower, "inProgress");
    } else if (index === "8") {
      updatePrb(steps.waterTower, "93%");
      toast.success("Validated");

      steps.step8.endDate < today
        ? updateBstate(steps.waterTower, "paused")
        : updateBstate(steps.waterTower, "inProgress");
    } else if (index === "9") {
      toast.success("Validated");

      updatePrb(steps.waterTower, "100%");
      updateBstate(steps.waterTower, "finished");
    }
    updateWateTowerSteps(id, index);
  };

  let params = (step, id, index) => {
    let marg =
      step.state === "now" || step.state === "outdate" ? "4px" : "65px";
    let btn = (step.state === "now" || step.state === "outdate") && (
      <span
        style={{
          color: "white",
          marginLeft: "auto",
          width: "110px",
          float: "right",
          textAlign: "center",
        }}
      >
        <button
          type='button'
          className='btn btn-dark'
          value={id + "/" + index}
          onClick={handleClick}
        >
          Validate
        </button>
      </span>
    );

    return (
      <div
        className='row'
        style={{ marginLeft: "auto", marginRight: `${marg}` }}
      >
        <span
          style={{
            backgroundColor: "#3F51B5",
            color: "white",
            padding: 4,
            paddingTop: 9,
            marginLeft: "auto",
            width: "110px",
            float: "left",
            textAlign: "center",
          }}
        >
          {step.startDate}
        </span>
        <span
          style={{
            backgroundColor: "#3F51B5",
            color: "white",
            padding: 4,
            paddingTop: 9,

            marginLeft: 14,
            width: "110px",
            float: "center",
            textAlign: "center",
          }}
        >
          {step.endDate}
        </span>
        {btn}
      </div>
    );
  };

  return (
    <>
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='0'>
            {steps.step1.title}
            {stepState(steps.step1.state)}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='0'>
            <Card.Body>{params(steps.step1, steps.stepsID, "1")}</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='1'>
            {steps.step2.title}
            {stepState(steps.step2.state)}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='1'>
            <Card.Body>{params(steps.step2, steps.stepsID, "2")}</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='2'>
            {steps.step3.title}
            {stepState(steps.step3.state)}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='2'>
            <Card.Body>{params(steps.step3, steps.stepsID, "3")}</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='3'>
            {steps.step4.title}
            {stepState(steps.step4.state)}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='3'>
            <Card.Body>{params(steps.step4, steps.stepsID, "4")}</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='4'>
            {steps.step5.title}
            {stepState(steps.step5.state)}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='4'>
            <Card.Body>{params(steps.step5, steps.stepsID, "5")}</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='5'>
            {steps.step6.title}
            {stepState(steps.step6.state)}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='5'>
            <Card.Body>{params(steps.step6, steps.stepsID, "6")}</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='6'>
            {steps.step7.title}
            {stepState(steps.step7.state)}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='6'>
            <Card.Body>{params(steps.step7, steps.stepsID, "7")}</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='7'>
            {steps.step8.title}
            {stepState(steps.step8.state)}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='7'>
            <Card.Body>{params(steps.step8, steps.stepsID, "8")}</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='8'>
            {steps.step9.title}
            {stepState(steps.step9.state)}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='8'>
            <Card.Body>{params(steps.step9, steps.stepsID, "9")}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};

export default MWsteps;

const stepState = (state) => {
  if (state === "valid") {
    return (
      <div style={{ display: "inline", float: "right", color: "green" }}>
        <i className='fas fa-check-circle mr-4'></i>
      </div>
    );
  } else if (state === "outdate") {
    return (
      <div style={{ display: "inline", float: "right", color: "red" }}>
        <i className='fas fa-times-circle'></i>
      </div>
    );
  } else if (state === "new") {
    return (
      <div style={{ display: "inline", float: "right", color: "#FBB003" }}>
        <i className='fas fa-info-circle'></i>
      </div>
    );
  } else {
    return (
      <div style={{ display: "inline", float: "right", color: "#13AABF" }}>
        <i className='fas fa-spinner'></i>
      </div>
    );
  }
};
