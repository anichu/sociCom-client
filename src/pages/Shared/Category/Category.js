import React from "react";
import { Link } from "react-router-dom";

const Category = ({ category }) => {
	return (
		<Link
			className="text-xl block font-semibold uppercase cursor-pointer px-10 py-1 border bg-[#1F2937] text-white rounded-md hover:bg-gray-700"
			to={`/courses/${category.name}`}
		>
			{category.name}
		</Link>
	);
};

export default Category;
