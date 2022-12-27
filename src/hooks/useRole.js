import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useRole = (email) => {
	const [role, setRole] = useState("");
	const [username, setUsername] = useState("");
	const [isVerified, setIsVerified] = useState("");
	const [roleLoading, setRoleLoading] = useState(true);
	useEffect(() => {
		if (email) {
			setRoleLoading(true);
			fetch(`https://resale-phone-server.vercel.app/user?email=${email}`)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					const { role, isVerified, name } = data;
					setRole(role);
					setIsVerified(isVerified);
					setUsername(name);
					setRoleLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setRoleLoading(false);
				});
		}
	}, [email]);

	return [role, roleLoading, isVerified, username];
};

export default useRole;
