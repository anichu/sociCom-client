import React from "react";
import pagenotfound from "../images/404.png";
const NotFoundRoute = () => {
	return (
		<div className="h-[100vh] w-full">
			<img src={pagenotfound} className="h-full w-full" alt="" />
		</div>
	);
};

export default NotFoundRoute;
