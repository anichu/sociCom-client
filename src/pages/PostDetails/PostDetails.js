import React, { useContext, useEffect, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { FiThumbsUp } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import Time from "../Shared/Time/Time";
import love from "../../images/love.png";
import like from "../../images/like.png";
import AddComment from "../Posts/AddComment/AddComment";
import Comment from "./Comment";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContetxt/AuthProvider";

const PostDetails = () => {
	const { id } = useParams();
	const { user } = useContext(AuthContext);
	const [post, setPost] = useState(null);
	const [postUser, setPostUser] = useState(null);

	const likeHandler = () => {
		console.log("like");
	};

	const loveHandler = () => {
		console.log("love");
	};
	const commentSubmitHandler = async (event) => {
		event.preventDefault();
		const form = event.target;
		const comment = form.comment.value;
		const createComment = {
			email: user?.email,
			comment,
		};
		try {
			const { data } = await axios.post(
				`http://localhost:5000/comment/${post?._id}`,
				createComment
			);
			console.log(data);
			if (data) {
				toast.success("comment created successfully");
				fetchPost();
				form.reset();
			}
		} catch (err) {}
	};

	const fetchPost = () => {
		fetch(`http://localhost:5000/post/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setPost(data);
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchPost();
	}, [id]);
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
	console.log(post);
	return (
		<div className="w-3/4 mt-[80px] bg-indigo-800 my-4 p-10 rounded-md  mx-auto">
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
						<Time time={post?.createdDate}></Time>
					</div>
				</div>
			</div>
			<div>
				<h6 className="py-5 text-white">{post?.text}</h6>
				{post?.image && (
					<div className="">
						<img
							src={post?.image}
							className="w-full max-h-[500px] rounded-md"
							alt=""
						/>
					</div>
				)}
			</div>

			<hr className="mt-2" />
			{/* */}
			<div className="flex pt-4">
				<div className=" cursor-pointer transition-all duration-300 ease-in-out  hover:bg-indigo-900 px-4 py-2 rounded-md hover-effect relative flex items-center">
					<div className="react-effect hidden">
						<div className="absolute flex rounded-xl justify-between  w-[80px] p-2 bg-white top-[-42px]">
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
					<div>
						<FiThumbsUp className="w-6 h-6"></FiThumbsUp>
					</div>
					<div className="ml-1">Like</div>
				</div>
			</div>

			<form onSubmit={commentSubmitHandler} className="py-2">
				<div className="w-full pt-5 pb-2">
					<textarea
						placeholder="write comment.."
						name="comment"
						className="bg-indigo-900 p-4 w-full border-[1px] outline-none focus:outline-none rounded-md"
					></textarea>
				</div>
				<div className="flex justify-between items-center">
					<div>
						<button
							type="submit"
							className="bg-purple-800 hover:bg-purple-900 px-4 py-2 rounded-md"
						>
							Add Comment
						</button>
					</div>
				</div>
			</form>

			<div>
				{post &&
					post?.comments?.map((comment, index) => (
						<Comment key={index} comment={comment}></Comment>
					))}
			</div>
		</div>
	);
};

export default PostDetails;
