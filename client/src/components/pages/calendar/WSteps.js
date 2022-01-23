import React, { useContext, useEffect } from "react";

import MasterForm from "./Wsteps/MasterForm";
import { Container, Row, Col } from "reactstrap";
import waterTowerStepsContext from "../../../context/watertower-steps/waterTowerStepsContext";

const CSteps = () => {
  const waterTowerStepsContexts = useContext(waterTowerStepsContext);

  useEffect(() => {
    waterTowerStepsContexts.getWaterTowersSteps();
  }, []);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <waterTowerStepsContext.Consumer>
              {(WaterTowerStepsContext) => (
                <MasterForm WaterTowerStepsContext={WaterTowerStepsContext} />
              )}
            </waterTowerStepsContext.Consumer>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CSteps;
