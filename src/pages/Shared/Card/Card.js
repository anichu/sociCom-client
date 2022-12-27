import React from "react";
import { Link } from "react-router-dom";

const Card = ({ course }) => {
	const { name, image, rating, duration, id } = course;
	console.log(course);
	return (
		<div className="p-2 border rounded">
			<img src={image} className="w-full h-[300px] mx-auto" alt="" />
			<Link to={`/course-details/${id}`}>
				<h3 className="mt-2 text-xl">{name}</h3>
			</Link>
			<div className="flex justify-between mt-3">
				<p>
					<span className="font-semibold">Rating:</span>{" "}
					<span className="px-5 text-white bg-purple-900 rounded-full">
						{rating}
					</span>{" "}
					out of 5
				</p>

				<p>
					<span className="font-semibold">Duration:</span>
					{duration}
				</p>
			</div>
			<Link to={`/course-details/${id}`} className="">
				<button className="block w-full py-2 mt-4 text-white bg-blue-900 rounded">
					Details page
				</button>
			</Link>
		</div>
	);
};

export default Card;
