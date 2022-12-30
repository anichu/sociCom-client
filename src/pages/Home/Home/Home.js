import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContetxt/AuthProvider";
import AddPost from "../AddPost/AddPost";
import TopPost from "../TopPost/TopPost";

const Home = () => {
	const { setTitle } = useContext(AuthContext);
	useEffect(() => {
		setTitle("Home | SociCom");
	}, [setTitle]);
	return (
		<div className="text-black">
			<AddPost></AddPost>
			<TopPost></TopPost>
		</div>
	);
};

export default Home;
