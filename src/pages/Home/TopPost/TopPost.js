import React, { useEffect, useState } from "react";
import Post from "../../Posts/Post/Post";

const TopPost = () => {
	const [popularPost, setPopularPost] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		fetch("http://localhost:5000/popular")
			.then((res) => res.json())
			.then((data) => {
				setPopularPost(data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
			});
	}, []);

	return (
		<div>
			<h1 className="text-center font-bold text-2xl">Popular post</h1>
			<div>
				{popularPost &&
					popularPost.map((post, index) => (
						<Post post={post} TopPost key={index}></Post>
					))}
			</div>
		</div>
	);
};

export default TopPost;
