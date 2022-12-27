import { createBrowserRouter } from "react-router-dom";
import Main from "../../LayOut/Main/Main";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import Posts from "../../pages/Posts/Posts";
import SignUp from "../../pages/SignUp/SignUp";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main></Main>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/login",
				element: <Login></Login>,
			},
			{
				path: "/signup",
				element: <SignUp></SignUp>,
			},
			{
				path: "/posts",
				element: <Posts></Posts>,
			},
		],
	},
]);

export default router;
