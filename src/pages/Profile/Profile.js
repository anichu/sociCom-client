import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContetxt/AuthProvider";
import { FaCamera, FaEdit } from "react-icons/fa";
import axios from "axios";
import { CiImageOn } from "react-icons/ci";
import { toast } from "react-hot-toast";
import Loader from "../Shared/Loader/Loader";
import Post from "../Posts/Post/Post";
const Profile = () => {
	const { user } = useContext(AuthContext);
	const [userDetails, setUserDetails] = useState("");
	const [openModal, setOpenModal] = useState(true);
	const [image, setImage] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [imageLoading, setImageLoading] = useState(false);
	const [myPostsLoading, setMyPostLoading] = useState(false);
	const [myposts, setMyposts] = useState([]);
	// get user
	useEffect(() => {
		fetch(`http://localhost:5000/user?email=${user?.email}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setUserDetails(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [user?.email]);

	useEffect(() => {
		setMyPostLoading(true);
		fetch(`http://localhost:5000/myposts?email=${user?.email}`)
			.then((res) => res.json())
			.then((data) => {
				setMyposts(data);
				setMyPostLoading(false);
			})
			.catch((err) => {
				setMyPostLoading(false);
				console.log(err);
			});
	}, [user?.email]);

	// open modal
	useEffect(() => {
		setOpenModal(true);
	}, [openModal]);
	// update image
	useEffect(() => {
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
						setImageUrl(imgData.data.url);
						const requestOptions = {
							method: "PUT",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ image: imgData.data.url }),
						};
						fetch(
							`http://localhost:5000/user/image?email=${user?.email}`,
							requestOptions
						)
							.then((res) => res.json())
							.then((data) => {
								console.log(data);
							})
							.catch((err) => {
								console.log(err);
							});
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
	}, [image]);

	const submitHandler = async (event) => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const address = form.address.value;
		const city = form.city.value;
		const university = form.university.value;
		const gender = form.gender.value;
		const dateOfBirth = form.dateOfBirth.value;
		const updateUser = {
			email: user?.email,
			image: userDetails?.image,
			name,
			address,
			city,
			university,
			gender,
			dateOfBirth,
		};
		try {
			const { data } = await axios.put(
				`http://localhost:5000/user?email=${user?.email}`,
				updateUser,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(data);
			if (data) {
				setUserDetails(updateUser);
				setOpenModal(false);
				toast.success("Profile is updated");
			}
		} catch (error) {
			console.log(error);
		}

		console.log(name, address, city, university, gender, dateOfBirth);
	};
	return (
		<div className="pt-[70px]  text-white">
			<div className="flex justify-center">
				<div className="profile-info relative max-h-[500px]  w-[40%] m-4 p-5 bg-indigo-700 rounded-md">
					<label
						htmlFor="my-modal-6"
						className="absolute cursor-pointer top-2 right-2 "
					>
						<FaEdit className="h-6 w-6 text-white"></FaEdit>
					</label>
					<div className="w-[100px] rounded-md border-[1px] mx-auto h-[100px]">
						{imageLoading ? (
							<Loader></Loader>
						) : (
							<img
								src={imageUrl ? imageUrl : userDetails?.image}
								className="w-full rounded-md h-full"
								alt=""
							/>
						)}
					</div>
					<div className="w-1/2 mt-4">
						<div class="choose_file_profile">
							<span className="cursor-pointer border-[1px] p-1 rounded-md">
								change image{" "}
							</span>
							<input
								name="image"
								className="cursor-pointer top-0 w-full"
								onChange={(e) => setImage(e.target.files[0])}
								type="file"
							/>
						</div>
					</div>
					<p className="text-xl pt-2">
						<b className="mr-2">Name:</b>
						{userDetails?.name}
					</p>
					<p className="pt-2">
						<b className="mr-2">Email:</b>
						<a
							href={`mailto:${userDetails?.email}`}
							className="hover:underline"
						>
							{userDetails?.email}
						</a>
					</p>
					<p className="py-2">
						<b className="mr-2">University:</b> {userDetails?.university}
					</p>
					<p className="">
						<b className="mr-2">City:</b> {userDetails?.city}
					</p>

					<p className="py-2">
						<b className="mr-2">Address:</b> {userDetails?.address}
					</p>
					<p className="">
						<b className="mr-2">Gender:</b> {userDetails?.gender}
					</p>
					<p className="py-2">
						<b className="mr-2">Date Of Birth:</b> {userDetails?.dateOfBirth}
					</p>
				</div>
				<div className="my-post w-1/2">
					{myPostsLoading ? (
						<Loader></Loader>
					) : (
						<div>
							<h1 className="text-center text-indigo-700 font-semibold text-3xl pb-2">
								{" "}
								My post{" "}
							</h1>
							<hr />
							{myposts.map((post, index) => (
								<Post key={index} post={post}></Post>
							))}
						</div>
					)}
				</div>
			</div>
			{openModal && (
				<>
					<input type="checkbox" id="my-modal-6" className="modal-toggle" />
					<div className="modal  modal-bottom sm:modal-middle">
						<div className="modal-box bg-indigo-700">
							<form onSubmit={submitHandler} className="w-full">
								<h4 className="text-center pb-2">Edit Profile</h4>
								<div>
									<input
										type="text"
										placeholder="name"
										name="name"
										defaultValue={userDetails?.name}
										className="bg-transparent border-[1px] outline-none px-2 py-1 w-full rounded-md"
									/>
								</div>
								<div className="mt-2">
									<input
										type="text"
										placeholder="university..."
										name="university"
										defaultValue={userDetails?.university}
										className="bg-transparent border-[1px] outline-none px-2 py-1 w-full rounded-md"
									/>
								</div>
								<div className="mt-2">
									<input
										type="text"
										placeholder="address..."
										name="address"
										defaultValue={userDetails?.address}
										className="bg-transparent border-[1px] outline-none px-2 py-1 w-full rounded-md"
									/>
								</div>
								<div className="mt-2">
									<input
										type="text"
										placeholder="city..."
										name="city"
										defaultValue={userDetails?.city}
										className="bg-transparent border-[1px] outline-none px-2 py-1 w-full rounded-md"
									/>
								</div>
								<div className="mt-2">
									<select
										className="bg-transparent bg-indigo-800 border-[1px] outline-none px-2 py-1 w-full rounded-md"
										name="gender"
										defaultValue={userDetails?.gender}
										id=""
									>
										<option value="male" selected>
											male
										</option>
										<option value="female">female</option>
										<option value="both">both</option>
									</select>
								</div>
								<div className="mt-2">
									<input
										type="date"
										name="dateOfBirth"
										defaultValue={userDetails?.dateOfBirth}
										className="bg-transparent border-[1px] outline-none px-2 py-1 w-full rounded-md"
									/>
								</div>
								<div className="mt-4 flex justify-between">
									<button type="submit" className="btn btn-success btn-sm">
										{" "}
										edit{" "}
									</button>
									<label
										htmlFor="my-modal-6"
										className="btn btn-sm bg-purple-800  border-0 text-white hover:bg-purple-900 btn-warning"
									>
										cancel
									</label>
								</div>
							</form>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Profile;
