import { UsersList } from "../components/UsersList";
export const Users = () => {
	const Users = [
		{
			id: "u1",
			name: "david",
			places: 2,
			image: "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300",
		},
	];
	return <UsersList items={Users}/>;
};
