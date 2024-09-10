import { type FC } from "react";

import { getLangFromUrl, useTranslations } from "@/assets/i18n/utils";

import { DashboardLogin } from "../widgets/DashboardLogin";

type LoginProps = {
	handleAuthorized: (value: boolean) => void;
};

export const Login: FC<LoginProps> = ({ handleAuthorized }) => {
	const lang = getLangFromUrl(location);
	const t = useTranslations(lang);

	return (
		<section className="dashboard">
			<div className="dashboard__main">
				<h1 className="srOnly">{t("dashboard.name")}</h1>
				<DashboardLogin handleAuthorized={handleAuthorized} />
			</div>
		</section>
	);
};
