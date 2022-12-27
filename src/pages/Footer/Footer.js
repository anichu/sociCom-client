import React from "react";
import {
	IoLogoFacebook,
	IoLogoGithub,
	IoLogoInstagram,
	IoLogoTwitter,
} from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io";

const Footer = () => {
	return (
		<footer className="border-t-2 max-h-[20vh] bg-purple-700">
			<div className="py-3 text-center text-white">
				{" "}
				&copy; 2022 MD:Anis Molla
			</div>
		</footer>
	);
};

export default Footer;
