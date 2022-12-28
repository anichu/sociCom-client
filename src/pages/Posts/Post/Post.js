import React, { useContext, useEffect, useState } from "react";
import Time from "../../Shared/Time/Time";
import { FiThumbsUp } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import AddComment from "../AddComment/AddComment";
const Post = ({ post, commentId, setCommentId }) => {
	const [postUser, setPostUser] = useState(null);

	console.log(post);
	const { createdDate, text, image, _id } = post;

	useEffect(() => {
		fetch(`http://localhost:5000/user?email=${post?.email}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setPostUser(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [post?.email]);

	return (
		<div className="w-3/4 bg-indigo-800 my-4 rounded-md p-10 mx-auto">
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<div className="border-2 rounded-full">
						<img
							className="w-[60px] h-[60px] rounded-full"
							src={postUser?.image}
							alt=""
						/>
					</div>
					<div className="profile-info ml-3">
						<h4 className="">{postUser?.name}</h4>
						<Time time={createdDate}></Time>
					</div>
				</div>
				<Link className="hover:underline">view details</Link>
			</div>
			<div>
				<h6 className="py-5 text-white">{text}</h6>
				{image && (
					<div className="">
						<img
							src={image}
							className="w-full max-h-[500px] rounded-md"
							alt=""
						/>
					</div>
				)}
			</div>
			<hr className="mt-2" />
			{/* */}
			<div className="flex pt-4">
				<div className="flex items-center">
					<div>
						<FiThumbsUp className="w-6 h-6"></FiThumbsUp>
					</div>
					<div className="ml-1">Like</div>
				</div>
				<div
					onClick={() => setCommentId(_id)}
					className="ml-5 flex cursor-pointer items-center"
				>
					<div>
						<BiCommentDetail className="w-6 h-6"></BiCommentDetail>
					</div>
					<div className="ml-1">Comment</div>
				</div>
			</div>
			{commentId && commentId === _id && (
				<div>
					<AddComment commentId={commentId}></AddComment>
				</div>
			)}
		</div>
	);
};

export default Post;
