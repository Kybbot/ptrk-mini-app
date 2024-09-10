import { type FC } from "react";

import { getLangFromUrl, useTranslations } from "@/assets/i18n/utils";

type DashboardEmptyProps = {
	type: "seminars" | "quizzes";
};

export const DashboardEmpty: FC<DashboardEmptyProps> = ({ type }) => {
	const lang = getLangFromUrl(location);
	const locale = lang === "ru" ? "/" : "/ua/";
	const t = useTranslations(lang);

	return (
		<div className="dashboardEmpty">
			<svg
				fill="none"
				width="240"
				height="240"
				aria-hidden="true"
				viewBox="0 0 240 240"
				className="dashboardEmpty__svg"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x="86.5" y="84.5" width="71" height="71" rx="35.5" stroke="#F4F4F4" />
				<path
					d="M122 104C123.364 104 124.672 104.532 125.637 105.48C126.601 106.427 127.143 107.713 127.143 109.053V119.158C127.143 120.498 126.601 121.783 125.637 122.731C124.672 123.678 123.364 124.211 122 124.211C120.636 124.211 119.328 123.678 118.363 122.731C117.399 121.783 116.857 120.498 116.857 119.158V109.053C116.857 107.713 117.399 106.427 118.363 105.48C119.328 104.532 120.636 104 122 104ZM134 119.158C134 125.103 129.526 130.004 123.714 130.829V136H120.286V130.829C114.474 130.004 110 125.103 110 119.158H113.429C113.429 121.391 114.332 123.533 115.939 125.112C117.547 126.692 119.727 127.579 122 127.579C124.273 127.579 126.453 126.692 128.061 125.112C129.668 123.533 130.571 121.391 130.571 119.158H134Z"
					fill="#111111"
				/>
				<circle cx="122" cy="120" r="91.5" stroke="#F3F3F3" strokeOpacity="0.4" />
				<circle cx="120" cy="120" r="119.5" stroke="#F3F3F3" strokeOpacity="0.15" />
				<circle cx="122" cy="120" r="63.5" stroke="#F4F4F4" />
				<rect x="55" y="77" width="24" height="24" rx="8" fill="#F4F4F4" />
				<path
					d="M67 82C67.5683 82 68.1134 82.2329 68.5152 82.6474C68.9171 83.062 69.1429 83.6243 69.1429 84.2105V88.6316C69.1429 89.2178 68.9171 89.7801 68.5152 90.1947C68.1134 90.6092 67.5683 90.8421 67 90.8421C66.4317 90.8421 65.8866 90.6092 65.4848 90.1947C65.0829 89.7801 64.8571 89.2178 64.8571 88.6316V84.2105C64.8571 83.6243 65.0829 83.062 65.4848 82.6474C65.8866 82.2329 66.4317 82 67 82ZM72 88.6316C72 91.2326 70.1357 93.3768 67.7143 93.7379V96H66.2857V93.7379C63.8643 93.3768 62 91.2326 62 88.6316H63.4286C63.4286 89.6087 63.8048 90.5458 64.4746 91.2367C65.1444 91.9276 66.0528 92.3158 67 92.3158C67.9472 92.3158 68.8556 91.9276 69.5254 91.2367C70.1952 90.5458 70.5714 89.6087 70.5714 88.6316H72Z"
					fill="#333333"
				/>
				<rect x="34" y="156" width="16" height="16" rx="4" fill="#FAFAFA" />
				<g clipPath="url(#clip0_490_576)">
					<mask
						id="mask0_490_576"
						style={{ maskType: "luminance" }}
						maskUnits="userSpaceOnUse"
						x="38"
						y="160"
						width="8"
						height="8"
					>
						<path d="M38 160H46V168H38V160Z" fill="white" />
					</mask>
					<g mask="url(#mask0_490_576)">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M45.378 165.082C46.2105 164.601 46.2105 163.399 45.378 162.917L41.1255 160.459C40.2925 159.977 39.25 160.579 39.25 161.541V166.458C39.25 167.421 40.2925 168.022 41.1255 167.54L45.378 165.082Z"
							fill="#9B9B9B"
						/>
					</g>
				</g>
				<rect x="194" y="66" width="16" height="16" rx="4" fill="#FAFAFA" />
				<path
					d="M204.198 71.2784C204.38 71.3451 204.5 71.518 204.5 71.7114V76.2868C204.5 76.4801 204.379 76.653 204.198 76.7197C203.855 76.8462 203.478 76.8462 203.135 76.7197C203.047 76.6871 202.97 76.6281 202.916 76.5508C202.862 76.4735 202.833 76.3815 202.833 76.2872V71.7118C202.833 71.5184 202.954 71.3455 203.135 71.2784C203.478 71.152 203.855 71.152 204.198 71.2784ZM200.865 71.2784C201.046 71.3451 201.167 71.518 201.167 71.7114V76.2868C201.167 76.4801 201.046 76.653 200.865 76.7197C200.522 76.8462 200.145 76.8462 199.802 76.7197C199.713 76.6871 199.637 76.6281 199.583 76.5508C199.529 76.4735 199.5 76.3815 199.5 76.2872V71.7118C199.5 71.5184 199.621 71.3455 199.802 71.2784C200.145 71.152 200.522 71.152 200.865 71.2784Z"
					fill="#9B9B9B"
				/>
				<rect x="162" y="140" width="24" height="24" rx="8" fill="#F4F4F4" />
				<path
					d="M168.75 152V156.083C168.75 156.725 169.275 157.25 169.917 157.25H171.083C171.725 157.25 172.25 156.725 172.25 156.083V153.75C172.25 153.108 171.725 152.583 171.083 152.583H169.917V152C169.917 149.743 171.743 147.917 174 147.917C176.257 147.917 178.083 149.743 178.083 152V152.583H176.917C176.275 152.583 175.75 153.108 175.75 153.75V156.083C175.75 156.725 176.275 157.25 176.917 157.25H178.083C178.725 157.25 179.25 156.725 179.25 156.083V152C179.25 150.608 178.697 149.272 177.712 148.288C176.728 147.303 175.392 146.75 174 146.75C172.608 146.75 171.272 147.303 170.288 148.288C169.303 149.272 168.75 150.608 168.75 152Z"
					fill="#333333"
				/>
				<defs>
					<clipPath id="clip0_490_576">
						<rect width="8" height="8" fill="white" transform="translate(38 160)" />
					</clipPath>
				</defs>
			</svg>
			{type === "seminars" ? (
				<>
					<p className="dashboardEmpty__title">{t("dashboardEmpty.title1")}</p>
					<p className="dashboardEmpty__description">{t("dashboardEmpty.description1")} </p>
					<div className="dashboardEmpty__links">
						<a href={`${locale}workshops`} className="dashboardEmpty__link">
							{t("dashboardEmpty.link1")}
						</a>
						<a href={`${locale}workbook`} className="dashboardEmpty__link">
							{t("dashboardEmpty.link2")}
						</a>
						<a href={`${locale}subbotnik`} className="dashboardEmpty__link">
							{t("dashboardEmpty.link3")}
						</a>
					</div>
				</>
			) : (
				<>
					<p className="dashboardEmpty__title">{t("dashboardEmpty.title2")}</p>
					<p className="dashboardEmpty__description">{t("dashboardEmpty.description2")} </p>
					<div className="dashboardEmpty__links">
						<a href={`${locale}quizzes`} className="dashboardEmpty__link">
							{t("dashboardEmpty.link4")}
						</a>
					</div>
				</>
			)}
		</div>
	);
};
