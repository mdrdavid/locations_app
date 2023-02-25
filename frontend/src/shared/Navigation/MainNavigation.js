import React, { useState } from "react";
import { Link } from "react-router-dom";
import Backdrop from "../UIElements/Backdrop";

import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";

const MainNavigation = (props) => {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	// function to control opening the side drawer on button click
	const openDrawerHandler = () => {
		setDrawerIsOpen(true);
	};

	// function to control closing the side drawer on  clicking space outside the sidebar

	const closeDrawerHandler = () => {
		setDrawerIsOpen(false);
	};

	return (
		<React.Fragment>
			{/* if drawer is open render backdrop */}

			{drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
			{/* if drawer is open render side links else render null */}

			{drawerIsOpen ? (
				// <SideDrawer show={drawerIsOpen}>
				<SideDrawer onClick={closeDrawerHandler}>
					<nav className="main-navigation__drawer-nav">
						<NavLinks />
					</nav>
				</SideDrawer>
			) : null}
			<MainHeader>
				<button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
					<span />
					<span />
					<span />
				</button>
				<h1 className="main-navigation__title">
					<Link to="/">YourPlaces</Link>
				</h1>
				<nav className="main-navigation__header-nav">
					<NavLinks />
				</nav>
			</MainHeader>
		</React.Fragment>
	);
};

export default MainNavigation;
