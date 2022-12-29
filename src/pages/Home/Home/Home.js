import React from "react";
import AddPost from "../AddPost/AddPost";
import TopPost from "../TopPost/TopPost";

const Home = () => {
	return (
		<div className="text-black">
			<AddPost></AddPost>
			<TopPost></TopPost>
		</div>
	);
};

export default Home;
