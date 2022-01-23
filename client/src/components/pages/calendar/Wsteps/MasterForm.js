import React, { Component } from "react";
import {
  Form,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
} from "reactstrap";
import toast from "react-hot-toast";

import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";
import Step9 from "./Step9";

import MultiStepProgressBar from "./MultiStepProgressBar";
import waterTowerContext from "../../../../context/waterTower/waterTowerContext";

class MasterForm extends Component {
  static contextType = waterTowerContext;
  constructor(props) {
    super(props);

    // Set the intiial input values
    this.state = {
      currentStep: 1,
      waterTower: "",
      stepsID: v4(),
      step1: {
        title: "réalisation du plan",
        state: "now",
        startDate: "",
        endDate: "",
      },
      step2: {
        title: "création des Fouilles et coulage des fondations",
        state: "new",
        startDate: "",
        endDate: "",
      },
      step3: {
        title: "mise en place des ferraillages",
        state: "new",
        startDate: "",
        endDate: "",
      },
      step4: {
        title: "coffrage des poteaux et des plates-formes",
        state: "new",
        startDate: "",
        endDate: "",
      },
      step5: {
        title: "mise en place de pompe",
        state: "new",
        startDate: "",
        endDate: "",
      },
      step6: {
        title: "création du radier et fut circulaire",
        state: "new",
        startDate: "",
        endDate: "",
      },
      step7: {
        title: "installaion de Panneaux solaires",
        state: "new",
        startDate: "",
        endDate: "",
      },
      step8: {
        title: "second oeuvre et finitions",
        state: "new",
        startDate: "",
        endDate: "",
      },
      step9: {
        title: "Livraison des travaux",
        state: "new",
        startDate: "",
        endDate: "",
      },
    };

    // Bind the submission to handleChange()
    this.handleChange = this.handleChange.bind(this);

    // Bind new functions for next and previous
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }
  // componentDidMount() {
  //   this.props.WaterTowerStepsContext.getWaterTowersSteps();
  // }
  // componentDidUpdate() {
  //   this.props.WaterTowerStepsContext.getWaterTowersSteps();
  // }

  // Use the submitted data to set the state
  handleChange(event) {
    let { name, value } = event.target;
    if (name === "1startDate" || name === "1endDate") {
      name = name.slice(1);
      this.setState({
        ...this.state,
        step1: { ...this.state.step1, [name]: value },
      });
    } else if (name === "2startDate" || name === "2endDate") {
      name = name.slice(1);
      this.setState({
        ...this.state,
        step2: { ...this.state.step2, [name]: value },
      });
    } else if (name === "3startDate" || name === "3endDate") {
      name = name.slice(1);
      this.setState({
        ...this.state,
        step3: { ...this.state.step3, [name]: value },
      });
    } else if (name === "4startDate" || name === "4endDate") {
      name = name.slice(1);
      this.setState({
        ...this.state,
        step4: { ...this.state.step4, [name]: value },
      });
    } else if (name === "5startDate" || name === "5endDate") {
      name = name.slice(1);
      this.setState({
        ...this.state,
        step5: { ...this.state.step5, [name]: value },
      });
    } else if (name === "6startDate" || name === "6endDate") {
      name = name.slice(1);
      this.setState({
        ...this.state,
        step6: { ...this.state.step6, [name]: value },
      });
    } else if (name === "7startDate" || name === "7endDate") {
      name = name.slice(1);
      this.setState({
        ...this.state,
        step7: { ...this.state.step7, [name]: value },
      });
    } else if (name === "8startDate" || name === "8endDate") {
      name = name.slice(1);
      this.setState({
        ...this.state,
        step8: { ...this.state.step8, [name]: value },
      });
    } else if (name === "9startDate" || name === "9endDate") {
      name = name.slice(1);
      this.setState({
        ...this.state,
        step9: { ...this.state.step9, [name]: value },
      });
    } else {
      this.setState({
        ...this.state,
        [name]: value,
      });
    }
  }

  // Trigger an alert on form submission
  handleSubmit = (event) => {
    event.preventDefault();
    const today = new Date().toJSON().slice(0, 10);

    this.props.WaterTowerStepsContext.addWaterTowerSteps(this.state);
    if (this.state.step1.endDate < today) {
      this.context.updateBstate(this.state.waterTower, "paused");
    } else {
      this.context.updateBstate(this.state.waterTower, "inProgress");
    }
    toast.success("Successfully added Steps");
    this.setState({
      currentStep: 1,
      waterTower: "",
      stepsID: v4(),
      step1: {
        title: "réalisation du plan",
        state: "now",
        startDate: "",
        endDate: "",
      },
      step2: {
        title: "création des Fouilles et coulage des fondations",
        state: "new",
        startDate: "",
        endDate: "",
      },
      step3: {
        title: "mise en place des ferraillages",
        state: "new",
        startDate: "",
        endDate: "",
      },
      step4: {
        title: "coffrage des poteaux et des plates-formes ",
        state: "new",
        startDate: "",
        endDate: "",
      },
      step5: {
        title: "mise en place de pompe",
        state: "new",
        startDate: "",
        endDate: "",
      },
      step6: {
        title: "création du radier et fut circulaire",
        state: "new",
        startDate: "",
        endDate: "",
      },
      step7: {
        title: "installaion de Panneaux solaires",
        state: "new",
        startDate: "",
        endDate: "",
      },
      step8: {
        title: "second oeuvre et finitions",
        state: "new",
        startDate: "",
        endDate: "",
      },
      step9: {
        title: "Livraison des travaux",
        state: "new",
        startDate: "",
        endDate: "",
      },
    });
  };

  // Test current step with ternary
  // _next and _previous functions will be called on button click
  _next(cs) {
    if (cs === 1 && this.state.waterTower === "") {
      toast.error("Can't be Empty");
    } else if (
      cs === 2 &&
      (this.state.step1.startDate === "" || this.state.step1.endDate === "")
    ) {
      toast.error("Can't be Empty");
    } else if (
      cs === 3 &&
      (this.state.step2.startDate === "" || this.state.step2.endDate === "")
    ) {
      toast.error("Can't be Empty");
    } else if (
      cs === 4 &&
      (this.state.step3.startDate === "" || this.state.step3.endDate === "")
    ) {
      toast.error("Can't be Empty");
    } else if (
      cs === 5 &&
      (this.state.step4.startDate === "" || this.state.step4.endDate === "")
    ) {
      toast.error("Can't be Empty");
    } else if (
      cs === 6 &&
      (this.state.step5.startDate === "" || this.state.step5.endDate === "")
    ) {
      toast.error("Can't be Empty");
    } else if (
      cs === 7 &&
      (this.state.step6.startDate === "" || this.state.step6.endDate === "")
    ) {
      toast.error("Can't be Empty");
    } else if (
      cs === 8 &&
      (this.state.step7.startDate === "" || this.state.step7.endDate === "")
    ) {
      toast.error("Can't be Empty");
    } else if (
      cs === 9 &&
      (this.state.step8.startDate === "" || this.state.step8.endDate === "")
    ) {
      toast.error("Can't be Empty");
    } else if (
      cs === 10 &&
      (this.state.step8.startDate === "" || this.state.step8.endDate === "")
    ) {
      toast.error("Can't be Empty");
    } else {
      let currentStep = cs;
      // If the current step is 1 or 2, then add one on "next" button click
      currentStep = currentStep >= 9 ? 10 : currentStep + 1;
      this.setState({
        currentStep: currentStep,
        step2: { ...this.state.step2, startDate: this.state.step1.endDate },
        step3: { ...this.state.step3, startDate: this.state.step2.endDate },
        step4: { ...this.state.step4, startDate: this.state.step3.endDate },
        step5: { ...this.state.step5, startDate: this.state.step4.endDate },
        step6: { ...this.state.step6, startDate: this.state.step5.endDate },
        step7: { ...this.state.step7, startDate: this.state.step6.endDate },
        step8: { ...this.state.step8, startDate: this.state.step7.endDate },
        step9: { ...this.state.step9, startDate: this.state.step8.endDate },
      });
    }
  }

  _prev() {
    let currentStep = this.state.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  }

  // The "next" and "previous" button functions
  get previousButton() {
    let currentStep = this.state.currentStep;

    // If the current step is not 1, then render the "previous" button
    if (currentStep !== 1) {
      return (
        <Button color='secondary mx-3 float-left' onClick={this._prev}>
          Previous
        </Button>
      );
    }

    // ...else return nothing
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 3, then render the "next" button
    if (currentStep < 10) {
      return (
        <Button
          color='primary float-right'
          onClick={() => this._next(currentStep)}
        >
          Next
        </Button>
      );
    }
    // ...else render nothing
    return null;
  }

  get submitButton() {
    let currentStep = this.state.currentStep;

    // If the current step is the last step, then render the "submit" button
    if (currentStep > 9) {
      return <Button color='primary float-right'>Submit</Button>;
    }
    // ...else render nothing
    return null;
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Card>
            <CardHeader>Steps Calendar</CardHeader>
            <CardBody>
              <CardTitle>
                <MultiStepProgressBar currentStep={this.state.currentStep} />
              </CardTitle>
              <CardText />
              <Step0
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                waterTower={this.state.waterTower}
              />
              <Step1
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                step1={this.state.step1}
                waterTower={this.state.waterTower}
              />
              <Step2
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                step1={this.state.step2}
                waterTower={this.state.waterTower}
              />
              <Step3
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                step1={this.state.step3}
                waterTower={this.state.waterTower}
              />

              <Step4
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                step1={this.state.step4}
                waterTower={this.state.waterTower}
              />
              <Step5
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                step1={this.state.step5}
                waterTower={this.state.waterTower}
              />
              <Step6
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                step1={this.state.step6}
                waterTower={this.state.waterTower}
              />
              <Step7
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                step1={this.state.step7}
                waterTower={this.state.waterTower}
              />
              <Step8
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                step1={this.state.step8}
                waterTower={this.state.waterTower}
              />
              <Step9
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                step1={this.state.step9}
                waterTower={this.state.waterTower}
              />
            </CardBody>
            <CardFooter>
              {this.previousButton}
              {this.nextButton}
              {this.submitButton}
            </CardFooter>
          </Card>
        </Form>
      </>
    );
  }
}

export default MasterForm;

const v4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
