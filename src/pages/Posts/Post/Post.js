import React, { useContext, useEffect, useRef, useState } from "react";
import Time from "../../Shared/Time/Time";
import { FiThumbsUp } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import love from "../../../images/love.png";
import like from "../../../images/like.png";

import AddComment from "../AddComment/AddComment";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContetxt/AuthProvider";
import { toast } from "react-hot-toast";
const Post = ({
	post,
	TopPost,
	fetchPosts,
	commentId,
	setCommentId,
	profile,
}) => {
	const [postUser, setPostUser] = useState(null);
	const { user } = useContext(AuthContext);
	const [isLike, setIsLike] = useState(null);
	const [countComments, setCountComments] = useState(post.comments.length);
	const [likeCount, setLikeCount] = useState({ like: 0, love: 0 });
	const ref = useRef();
	// console.log(post);
	const { createdDate, text, image, _id, likes } = post;
	useEffect(() => {
		for (let i = 0; i < likes.length; i++) {
			if (likes[i].email === user?.email) {
				setIsLike(likes[i]);
			}
		}
	}, [setIsLike, likes, user?.email]);

	useEffect(() => {
		fetchTotalCount();
	}, [_id, isLike, setIsLike]);

	const fetchTotalCount = () => {
		fetch(`http://localhost:5000/post/like/total/${_id}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setLikeCount(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const deleteLikeHandler = async (likeId = null) => {
		if (!user?.email) {
			toast.error("Please,Login");
			return;
		}
		try {
			if (likeId) {
				const { data } = axios.get(
					`http://localhost:5000/post/like/delete?postId=${post._id}&likeId=${likeId}&email=${user?.email}`
				);
				setIsLike(null);
				fetchTotalCount();
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const likeHandler = async () => {
		const createReaction = {
			like: "like",
			name: user?.name,
			email: user?.email,
		};

		if (!user?.email) {
			toast.error("Please,Login");
			return;
		}

		try {
			if (isLike?.like !== "like") {
				const { data } = await axios.post(
					`http://localhost:5000/post/like/${_id}`,
					createReaction
				);
				setIsLike(data);
				console.log(data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const loveHandler = async () => {
		if (!user?.email) {
			toast.error("Please,Login");
			return;
		}
		const createReaction = {
			like: "love",
			name: user?.name,
			email: user?.email,
		};
		try {
			if (isLike?.like !== "love") {
				const { data } = await axios.post(
					`http://localhost:5000/post/like/${_id}`,
					createReaction
				);
				setIsLike(data);
				console.log(data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetch(`http://localhost:5000/user?email=${post?.email}`)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
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
						<Link to={`/profile/${postUser?.email}`}>
							<h4 className="hover:underline">{postUser?.name}</h4>
						</Link>
						<Time time={createdDate}></Time>
					</div>
				</div>
				<Link to={`/post/${_id}`} className="hover:underline">
					view details
				</Link>
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
			<hr className="pt-3 mt-2" />
			<div className="flex justify-between">
				<div>
					{likeCount.like > likeCount.love ? (
						<div className="flex">
							<div className="flex items-center">
								<span>{likeCount.like}</span>
								<img className="w-10 h-6" title="like" src={like} alt="" />
							</div>
							<div className="flex items-center">
								<span className="mr-2">{likeCount.love}</span>
								<img className="w-6 h-6" title="love" src={love} alt="" />
							</div>
						</div>
					) : (
						<div className="flex">
							<div className="flex items-center mr-2">
								<span className="text-white mr-2">{likeCount.love}</span>
								<img className="w-6 h-6" title="love" src={love} alt="" />
							</div>
							<div className="flex items-center">
								<span>{likeCount.like}</span>
								<img className="w-10 h-6" title="like" src={like} alt="" />
							</div>
						</div>
					)}
				</div>
				<div>
					{countComments > 0 && (
						<Link to={`/post/${_id}`} className="hover:underline">
							<p>{countComments} comments</p>
						</Link>
					)}
				</div>
			</div>

			{(!profile || !user.email) && (
				<>
					<hr className="mt-2" />
					{/* */}
					<div className="flex pt-4">
						<div className=" cursor-pointer transition-all  ease-in-out  hover:bg-indigo-900 px-4 py-2 rounded-md hover-effect relative flex items-center">
							<div ref={ref} className="react-effect hidden">
								<div className="absolute flex rounded-xl left-0 justify-between  w-[80px] p-2 bg-white top-[-38px]">
									<p
										onClick={likeHandler}
										className="react transition-all duration-300"
									>
										<img className="w-10 h-6" title="like" src={like} alt="" />
									</p>
									<p onClick={loveHandler} className="react">
										<img className="w-6 h-6" title="love" src={love} alt="" />
									</p>
								</div>
							</div>

							<div onClick={() => deleteLikeHandler(isLike?._id)}>
								{isLike ? (
									isLike?.like === "like" ? (
										<img className="w-10 h-6" title="like" src={like} alt="" />
									) : (
										<img className="w-6 h-6" title="love" src={love} alt="" />
									)
								) : (
									<div>
										<FiThumbsUp className="w-6 h-6"></FiThumbsUp>
									</div>
								)}
							</div>
							<div className="ml-1">
								{isLike ? (
									isLike?.like === "like" ? (
										<span className="text-blue-600 text-xl font-semibold">
											like
										</span>
									) : (
										<span className="text-red-700  font-semibold">love</span>
									)
								) : (
									"Like"
								)}
							</div>
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
							<AddComment
								setCountComments={setCountComments}
								commentId={commentId}
							></AddComment>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Post;
