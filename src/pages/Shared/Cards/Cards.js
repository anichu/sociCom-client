import React from "react";
import { useLoaderData } from "react-router-dom";
import Card from "../Card/Card";

const Cards = () => {
	const data = useLoaderData();
	const { courses, categoryName } = data;
	return (
		<div>
			<h1 className="w-full text-3xl text-center capitalize">
				total <span className="text-purple-700">{courses.length}</span> courses{" "}
				{categoryName && (
					<>
						{" "}
						of{" "}
						<span className="font-semibold text-purple-800">
							{categoryName}
						</span>
					</>
				)}
			</h1>

			<div className="grid items-center justify-center gap-5 mt-6 md:grid-cols-2 sm:grid-cols-1">
				{courses.map((course) => {
					return <Card course={course} key={course.id}></Card>;
				})}
			</div>
		</div>
	);
};

export default Cards;
