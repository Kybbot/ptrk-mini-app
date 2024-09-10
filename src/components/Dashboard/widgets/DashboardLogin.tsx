import React, { type ChangeEvent, type FC, type FormEvent, useState } from "react";

import { getLangFromUrl, useTranslations } from "@/assets/i18n/utils";

type DashboardLoginProps = {
	handleAuthorized: (value: boolean) => void;
};

export const DashboardLogin: FC<DashboardLoginProps> = ({ handleAuthorized }) => {
	const lang = getLangFromUrl(location);
	const t = useTranslations(lang);

	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [formState, setFormState] = useState<"email" | "otp">("email");

	const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handleOtp = (event: ChangeEvent<HTMLInputElement>) => {
		setOtp(event.target.value);
	};

	const handleForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (error) setError(null);

		if (formState === "email") {
			try {
				if (email) {
					setLoading(true);

					const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/auth/send-otp`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, lang: lang }),
					});

					const data = await response.json();

					if (!response.ok && response.status === 409) {
						setError(data.message);
						setLoading(false);
						setFormState("otp");
						return;
					}

					if (!response.ok) {
						throw new Error(t("errors.sendEmailData"));
					}

					setLoading(false);
					setFormState("otp");
				}
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				}
			} finally {
				setLoading(false);
			}
		} else {
			try {
				if (email && otp) {
					setLoading(true);

					const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/auth/by-otp`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, otp: +otp, lang: lang }),
					});

					if (!response.ok) {
						throw new Error(t("errors.sendOtpData"));
					}

					const data = (await response.json()) as {
						results: {
							email: string;
							accessToken: string;
							refreshToken: string;
						};
					};

					setLoading(false);

					localStorage.setItem("accessToken", data.results.accessToken);
					localStorage.setItem("refreshToken", data.results.refreshToken);
					localStorage.setItem("dashboardEmail", data.results.email);
					window.dispatchEvent(new Event("storage"));

					handleAuthorized(true);
				}
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				}
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<div className="dashboardLogin__container">
			<div className="dashboardLogin__main">
				<p className="dashboardLogin__title">{t("dashboardLogin.title")}</p>
				<form className="dashboardLogin__form" onSubmit={handleForm}>
					{formState === "otp" && (
						<p className="dashboardLogin__help">
							{t("dashboardLogin.help")} <span className="dashboardLogin__help--span">{email}</span>
						</p>
					)}
					{formState === "email" ? (
						<label htmlFor="email" className="dashboardLogin__input">
							<span className="dashboardLogin__input--title">{t("dashboardLogin.email")}</span>
							<input
								required
								id="email"
								type="email"
								name="email"
								value={email}
								autoComplete="email"
								onChange={handleEmail}
								placeholder={t("dashboardLogin.email")}
								className="dashboardLogin__input--field"
							/>
						</label>
					) : (
						<label htmlFor="otp" className="dashboardLogin__input">
							<span className="dashboardLogin__input--title">{t("dashboardLogin.otp")}</span>
							<input
								required
								id="otp"
								type="text"
								name="otp"
								value={otp}
								onChange={handleOtp}
								placeholder={t("dashboardLogin.otp")}
								className="dashboardLogin__input--field"
							/>
						</label>
					)}
					<button type="submit" className="dashboardLogin__button">
						{loading ? (
							<div className="loader loader--active">
								<div className="loader__dot"></div>
								<div className="loader__dot"></div>
								<div className="loader__dot"></div>
							</div>
						) : (
							<>{formState === "email" ? t("dashboardLogin.next") : t("dashboardLogin.login")}</>
						)}
					</button>
					{formState === "otp" && (
						<button
							type="button"
							disabled={loading}
							className="dashboardLogin__button dashboardLogin__button--secondary"
							onClick={() => {
								setOtp("");
								setError(null);
								setFormState("email");
							}}
						>
							<svg
								width="24"
								height="24"
								fill="none"
								aria-hidden="true"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8.05649 17L3 12L8.05649 7L8.90635 7.84041L5.30069 11.4058L21 11.4058L21 12.5943L5.3008 12.5943L8.90635 16.1596L8.05649 17Z"
									fill="black"
								/>
							</svg>
							{t("dashboardLogin.back")}
						</button>
					)}
				</form>
				{error && <p className="dashboardLogin__error">{error}</p>}
			</div>
		</div>
	);
};
