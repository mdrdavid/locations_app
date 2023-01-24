import { useParams } from "react-router-dom";
import { Button } from "../../shared/FormElements/Button";
import { Input } from "../../shared/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import "./PlaceForm.css";

const DUMMY_PLACES = [
	{
		id: "p1",
		title: "Empire State Building",
		description: "One of the most famous sky scrapers in the world!",
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
		address: "20 W 34th St, New York, NY 10001",
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: "u1",
	},
	{
		id: "p2",
		title: "Empire State Building",
		description: "One of the most famous sky scrapers in the world!",
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
		address: "20 W 34th St, New York, NY 10001",
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: "u2",
	},
];

export const UpdatePlace = () => {
	const placeId = useParams().placeId;
	const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
	if (!identifiedPlace) {
		return (
			<div>
				<h2>Could not find place</h2>
			</div>
		);
	}
	return (
		<form className="place-form">
			<Input
				id="title"
				type="text"
				label="Title"
				validators={[VALIDATOR_REQUIRE]}
				errorText="Please enter a valid Title"
				onInput={() => {}}
				value={identifiedPlace.title}
				valid={true}
			/>
      <Input
				id="description"
				label="Description"
				validators={[VALIDATOR_MINLENGTH(5)]}
				errorText="Please enter a valid Description (min 5 characters)"
				onInput={() => {}}
				value={identifiedPlace.description}
				valid={true}
			/>
			<Button type ="submit" disabled={true}> UPDATE PLACE</Button>
		</form>
	);
};
