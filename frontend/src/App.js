import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import "./App.css";
import { NewPlace } from "./places/pages/NewPlace";
import { Users } from "./user/pages/Users";
import MainNavigation from "./shared/Navigation/MainNavigation";

const  App = () =>{
	return(
  <Router>
    <MainNavigation/> 
    <main>
    <Switch>
    <Route path="/" exact> <Users/> </Route>
    <Route path="/places/new" exact> <NewPlace/> </Route>
    <Redirect to="/"/>
    </Switch>
    </main>
  </Router>
  )
}

export default App;
