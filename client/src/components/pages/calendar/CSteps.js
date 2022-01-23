import React, { useContext, useEffect } from "react";

import MasterForm from "./Bsteps/MasterForm";
import { Container, Row, Col } from "reactstrap";
import buildingStepsContext from "../../../context/building-steps/buildingtStepsContext";
const CSteps = () => {
  const buildingStepsContexts = useContext(buildingStepsContext);
  useEffect(() => {
    buildingStepsContexts.getBuildingSteps();
  }, []);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <buildingStepsContext.Consumer>
              {(BuildingStepsContext) => (
                <MasterForm BuildingStepsContext={BuildingStepsContext} />
              )}
            </buildingStepsContext.Consumer>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CSteps;
