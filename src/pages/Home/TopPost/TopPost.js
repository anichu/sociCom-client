import React, { useEffect, useState } from "react";
import Post from "../../Posts/Post/Post";
import Loader from "../../Shared/Loader/Loader";

const TopPost = () => {
	const [popularPost, setPopularPost] = useState([]);
	const [commentId, setCommentId] = useState();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		fetch("https://socicom-server-anichu.vercel.app/popular")
			.then((res) => res.json())
			.then((data) => {
				setPopularPost(data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <Loader></Loader>;
	}
	return (
		<div>
			<h1 className="text-center font-bold text-2xl">Popular post</h1>
			<div>
				{popularPost &&
					popularPost.map((post, index) => (
						<Post
							post={post}
							setCommentId={setCommentId}
							commentId={commentId}
							TopPost
							key={index}
						></Post>
					))}
			</div>
		</div>
	);
};

export default TopPost;
