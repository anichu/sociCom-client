import { createBrowserRouter } from "react-router-dom";
import Main from "../../LayOut/Main/Main";
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
				element: <Profile></Profile>,
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
]);

export default router;
