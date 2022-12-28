import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContetxt/AuthProvider";

const AddComment = ({ commentId }) => {
	const { user } = useContext(AuthContext);
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
				`http://localhost:5000/comment/${commentId}`,
				createComment
			);
			console.log(data);
			if (data) {
				toast.success("comment created successfully");
				form.reset();
			}
		} catch (err) {}
	};
	return (
		<div>
			<form onSubmit={commentSubmitHandler} action="">
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
					<Link to={`/post/${commentId}`} className="hover:underline">
						view comments
					</Link>
				</div>
			</form>
		</div>
	);
};

export default AddComment;
