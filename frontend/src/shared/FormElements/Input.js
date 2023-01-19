import React, { useEffect, useReducer } from "react";
import { validate } from "../utils/validators";

import "./Input.css";
const inputReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE":
			return {
				...state,
				value: action.val,
				isValid: validate(action.val, action.validators),
			};
			case "TOUCH":
			return {
				...state,
				isTouched: true,
			};
		default:
			return state;
	}
};

export const Input = (props) => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: "",
		isValid: false,
		isTouched: false
	});

	const {id,onInput} = props
	const {value, isValid} = inputState
	
	useEffect(() => {},[id, value,isValid, onInput])

	const changeHandler = (event) => {
		// pass the action to the reduce
		dispatch({
			type: "CHANGE",
			val: event.target.value,
			validators: props.validators,
		});
	};

	const touchHandler = () =>{
		dispatch({
			type: "TOUCH"
		})
	}
	const element =
		props.element === "input" ? (
			<input
				id={props.id}
				type={props.type}
				placeholder={props.placeholder}
				value={inputState.value}
				onChange={changeHandler}
				onBlur={touchHandler}
			/>
		) : (
			<textarea
				id={props.id}
				rows={props.rows || 3}
				onChange={changeHandler}
				value={inputState.value}
				onBlur={touchHandler}

			/>
		);

	return (
		// if input is invalid render different css
		<div
			className={`form-control ${
				!inputState.isValid && inputState.isTouched && "form-control--invalid"
			}`}
		>
			<label htmlFor={props.id}>{props.label}</label>
			{element}

			{/* check if input value  is invalid and return error message */}
			{!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
		</div>
	);
};
