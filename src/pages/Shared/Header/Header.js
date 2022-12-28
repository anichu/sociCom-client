import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContetxt/AuthProvider";

const Navbar = () => {
	const { user, logOut } = useContext(AuthContext);

	const menuItems = (
		<>
			<li>
				<Link to="/" className="hover:bg-purple-900 mr-2 rounded-md py-2">
					Home
				</Link>
			</li>
			<li>
				<Link
					to="/posts"
					className="hover:bg-purple-900 lg:mx-2 mx-0 rounded-md py-2"
				>
					posts
				</Link>
			</li>
		</>
	);
	const logOutHandler = () => {
		logOut()
			.then(() => {
				toast.success("user logout");
			})
			.catch((err) => {
				toast.error(err.message);
				console.log(err);
			});
	};
	return (
		<div className="navbar max-w-screen-xl border-b-2 border-indigo-700 z-50 mx-auto fixed top-0  text-white bg-purple-700">
			<div className="">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-compact dropdown-content mt-3 p-2 shadow text-white bg-indigo-800  rounded-box w-52"
					>
						<div className="ml-4">{user?.displayName}</div>
						{menuItems}
					</ul>
				</div>
				<Link
					to="/"
					className="normal-case text-xl px-4 mr-2 rounded-md hover:bg-purple-900 py-2"
				>
					SociCom
				</Link>
			</div>
			<div className="navbar-start w-full hidden lg:flex">
				<ul className="menu menu-horizontal p-0">{menuItems}</ul>
			</div>
			{user ? (
				<div className="text-right w-full justify-end ">
					<div>
						<Link
							to="/profile"
							className="hover:bg-purple-900 rounded-md mr-2 px-4 py-2"
						>
							Profile
						</Link>
					</div>
					<button
						onClick={logOutHandler}
						className="normal-case  px-4 mr-2 rounded-md hover:bg-purple-900 py-2"
					>
						Logout
					</button>
				</div>
			) : (
				<div className="text-right w-full justify-end ">
					<Link
						to="/login"
						className="hover:bg-purple-900 rounded-md mr-2 px-4 py-2"
					>
						Login
					</Link>
				</div>
			)}
		</div>
	);
};

export default Navbar;
