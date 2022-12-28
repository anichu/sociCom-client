import React, { useEffect, useState } from "react";
import Loader from "../../Shared/Loader/Loader";
import Post from "../Post/Post";

const Posts = () => {
	const [postLoading, setPostLoading] = useState(false);
	const [posts, setPosts] = useState([]);
	const [commentId, setCommentId] = useState();

	useEffect(() => {
		setPostLoading(true);
		fetch("http://localhost:5000/posts")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setPosts(data);
				setPostLoading(false);
			})
			.catch((err) => {
				console.log(err.message);
				setPostLoading(false);
			});
	}, []);

	if (postLoading) {
		return <Loader></Loader>;
	}

	return (
		<div className="pt-[60px]">
			{posts &&
				posts?.map((post, index) => {
					return (
						<Post
							key={index}
							commentId={commentId}
							setCommentId={setCommentId}
							post={post}
						></Post>
					);
				})}
		</div>
	);
};

export default Posts;
