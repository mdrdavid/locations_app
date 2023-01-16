import Card from "../../shared/UIElements/Card";
import { PlaceItem } from "./PlaceItem"
import "./PlaceList.css";

export const PlaceList = (props) => {
	if (props.items === 0) {
		return (
			<div className="place-list center">
				<Card>
					<h2>There are no places please create a place</h2>
					<button>Share a place</button>
				</Card>
			</div>
		);
	}

	return (
		<ul className="place-list">
			{
			props.items.map((place) => (
				<PlaceItem
					key={place.id}
					id={place.id}
					image={place.imageUrl}
					title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
				/>
			))}
		</ul>
	);
};