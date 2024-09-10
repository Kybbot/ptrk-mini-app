import { type FC, useState } from "react";

import { Main } from "./pages/Main";
import { Login } from "./pages/Login";

export const DashboardPage: FC = () => {
	const authToken = localStorage.getItem("accessToken");

	const [isAuthorized, setAuthorized] = useState(!!authToken);

	const handleAuthorized = (value: boolean) => {
		setAuthorized(value);
	};

	if (!isAuthorized) {
		return <Login handleAuthorized={handleAuthorized} />;
	}

	return <Main handleAuthorized={handleAuthorized} />;
};
