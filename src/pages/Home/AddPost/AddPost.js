import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CiImageOn } from "react-icons/ci";
import { AuthContext } from "../../../contexts/AuthContetxt/AuthProvider";
import Loader from "../../Shared/Loader/Loader";
import "./addpost.css";

const AddPost = () => {
	const { user } = useContext(AuthContext);
	const [text, setText] = useState("");
	const [image, setImage] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [imageLoading, setImageLoading] = useState(false);

	useEffect(() => {
		if (!user?.email) {
			toast.error("Please,Login");
			return;
		}

		if (image && image?.type?.includes("image")) {
			setImageLoading(true);
			const formData = new FormData();
			formData.append("image", image);
			const imageHostKey = process.env.REACT_APP_imgbb_key;
			const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
			fetch(url, {
				method: "POST",
				body: formData,
			})
				.then((res) => res.json())
				.then((imgData) => {
					if (imgData.success) {
						console.log(imgData.data.url);
						setImageUrl(imgData.data.url);
					}
					setImageLoading(false);
				})
				.catch((err) => {
					setImageLoading(false);
					console.log(err.message);
				});
		} else if (image && !image?.type?.includes("image")) {
			console.log("pdf");
		} else if (image) {
			toast.error();
		}
	}, [image, user?.email]);

	const addPostHandler = async () => {
		if (!user?.email) {
			toast.error("Please,Login");
			return;
		}
		if (text || imageUrl) {
			console.log(text, imageUrl);
			const createUser = {
				text,
				image: imageUrl,
				comments: [],
				likes: [],
				email: user?.email,
				name: user?.displayName,
				profileImage: user?.photoURL,
			};
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"sociCom-accessToken"
					)}`,
				},
			};

			try {
				const { data } = await axios.post(
					"http://localhost:5000/posts",
					createUser,
					config
				);
				console.log(data);
				if (data.acknowledged) {
					toast.success("post created successfully");
					setText("");
					setImageUrl("");
					setImage("");
				}
			} catch (error) {
				console.log(error);
				toast.error(error.message);
			}
		}
	};

	return (
		<div className="w-3/4 bg-indigo-700 my-5 mx-auto">
			<form className="bg-white w-full pt-[70px]">
				<div className="border-2  border-indigo-700 w-full mx-auto p-4 bg-indigo-700">
					<div className="w-full">
						<textarea
							onChange={(e) => setText(e.target.value)}
							placeholder="write something what you want........"
							name="text"
							value={text}
							className="bg-white text-left text-black p-2  w-full h-auto border-transparent bg-transparent placeholder:text-gray py-2 border-0  text-base outline-none rounded-md"
						></textarea>
						<div>
							{imageLoading && <Loader></Loader>}
							{imageUrl && (
								<img className="text-left rounded-md" src={imageUrl} alt="" />
							)}
						</div>
					</div>
					<div className="w-1/2 mt-4">
						<div class="choose_file">
							<CiImageOn className="w-8 h-10  text-left"></CiImageOn>{" "}
							<input
								name="image"
								className="cursor-pointer w-8 h-10"
								onChange={(e) => setImage(e.target.files[0])}
								type="file"
							/>
						</div>
					</div>
				</div>
				{(text || imageUrl) && (
					<div className="text-left p-4 bg-indigo-700">
						<button
							type="button"
							onClick={addPostHandler}
							className="bg-purple-700 text-white text-sm font-semibold px-3 py-1 rounded-sm"
						>
							Add Post
						</button>
					</div>
				)}
			</form>
		</div>
	);
};

export default AddPost;
