import "./App.css";
import SideBar from "./components/layout/SideBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BuildingState from "./context/building/BuildingState";
import WaterTowerState from "./context/waterTower/WaterTowerState";
import CompanyState from "./context/companies/companyState";
import ExpenseState from "./context/expenses/ExpenseState";
import BuildingStepsState from "./context/building-steps/BuildingStepsState";
import WaterTowerSteps from "./context/watertower-steps/WaterTowerStepsState";
import setAuthToken from "./utils/setAuthToken";
import AuthState from "./context/auth/AuthState";
import UserState from "./context/users/UserState";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  return (
    <AuthState>
      <UserState>
        <BuildingStepsState>
          <WaterTowerSteps>
            <ExpenseState>
              <CompanyState>
                <BuildingState>
                  <WaterTowerState>
                    <Router>
                      <SideBar />
                    </Router>
                  </WaterTowerState>
                </BuildingState>
              </CompanyState>
            </ExpenseState>
          </WaterTowerSteps>
        </BuildingStepsState>
      </UserState>
    </AuthState>
  );
}

export default App;
