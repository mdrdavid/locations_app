import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import "./index.css";
import { NewPlace } from "./places/pages/NewPlace";
import { Users } from "./user/pages/Users";
import MainNavigation from "./shared/Navigation/MainNavigation";
import { UserPlaces } from "./places/pages/UserPlaces";

const App = () => {
	return (
		<Router>
			<MainNavigation />
			<main>
				<Switch>
					<Route path="/" exact>
						{" "}
						<Users />{" "}
					</Route>
					<Route path="/places/new" exact>
						{" "}
						<NewPlace />{" "}
					</Route>
					<Route path="/:userId/places" exact>
						{" "}
						<UserPlaces />{" "}
					</Route>
					<Redirect to="/" />
				</Switch>
			</main>
		</Router>
	);
};

export default App;
