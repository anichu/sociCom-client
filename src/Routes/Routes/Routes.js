import { createBrowserRouter } from "react-router-dom";
import Main from "../../LayOut/Main/Main";
import NotFoundRoute from "../../notFoundRoute/NotFoundRoute";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import PostDetails from "../../pages/PostDetails/PostDetails";
import Posts from "../../pages/Posts/Posts/Posts";
import Profile from "../../pages/Profile/Profile";
import SignUp from "../../pages/SignUp/SignUp";
import PrivateRoutes from "../../Routes/PrivateRoute/PrivateRoutes";

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
			{
				path: "/profile",
				element: (
					<PrivateRoutes>
						<Profile></Profile>
					</PrivateRoutes>
				),
			},
			{
				path: "/post/:id",
				element: (
					<PrivateRoutes>
						<PostDetails></PostDetails>
					</PrivateRoutes>
				),
			},
		],
	},
	{
		path: "*",
		element: <NotFoundRoute></NotFoundRoute>,
	},
]);

export default router;
