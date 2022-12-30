import React, { useEffect, useState } from "react";
import Time from "../Shared/Time/Time";

const Comment = ({ comment, setCountComments }) => {
	const [commentUser, setCommentUser] = useState(null);
	useEffect(() => {
		fetch(
			`https://socicom-server-anichu.vercel.app/user?email=${comment?.email}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setCommentUser(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [comment?.email]);
	return (
		<div>
			<div className="px-5 py-2 flex items-center">
				<div>
					<div>
						<img
							src={commentUser?.image}
							className="w-[40px] h-[40px] rounded-full"
							alt=""
						/>
					</div>
				</div>
				<div className="shadow-lg ml-2 border-[1px] px-3 bg-indigo-600 py-1 w-full rounded-md ">
					<h1>{commentUser?.name}</h1>
					<p className="text-white">{comment.comment}</p>
				</div>
			</div>

			<p className="ml-10 w-full">
				<Time time={comment?.createdDate}></Time>
			</p>
		</div>
	);
};

export default Comment;
