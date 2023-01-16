import React, { useReducer } from "react";

import "./Input.css";
const inputReducer = (state, action) =>{
	switch(action.type){
		case "CHANGE":
			return{}
			default:
			return state;
	}
}

export const Input = (props) => {
	useReducer(inputReducer)
	const changeHandler = () =>{}
	const element =
		props.element === "input" ? (
			<input id={props.id} type={props.type} placeholder={props.placeholder} />
		) : (
			<textarea id={props.id} rows={props.rows || 3} onChange={changeHandler}/>
		);

	return (
		<div className={`form-control`}>
			<label htmlFor={props.id}>{props.label}</label>
			{element}
		</div>
	);
};
