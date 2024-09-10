import { type FC, useEffect, useRef, useState } from "react";

type DashboardModalProps = {
	videoId: string;
	showDashboardModal: boolean;
	handleShowDashboardModal: () => void;
};

export const DashboardModal: FC<DashboardModalProps> = ({
	videoId,
	showDashboardModal,
	handleShowDashboardModal,
}) => {
	const dashboardModalRef = useRef<HTMLDivElement>(null);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		document.body.style.overflow = "hidden";

		const dashboardModalHandler = (event: MouseEvent) => {
			const target = event.target as HTMLElement;

			if (
				target.classList.contains("dashboardModal") ||
				target.classList.contains("modal__content") ||
				target.classList.contains("dashboardModal__container")
			) {
				document.body.style.overflow = "initial";
				handleShowDashboardModal();
			}
		};

		const closeHandler = (event: KeyboardEvent) => {
			if (
				event.key === "Escape" &&
				dashboardModalRef.current?.classList.contains("dashboardModal--visible")
			) {
				document.body.style.overflow = "initial";
				handleShowDashboardModal();
			}
		};

		window.addEventListener("keydown", closeHandler);

		dashboardModalRef.current?.addEventListener("click", dashboardModalHandler);

		return () => {
			window.removeEventListener("keydown", closeHandler);
			dashboardModalRef.current?.removeEventListener("click", dashboardModalHandler);
		};
	}, []);

	return (
		<div
			ref={dashboardModalRef}
			className={`modal dashboardModal ${showDashboardModal ? "dashboardModal--visible" : ""}`}
		>
			<div className="modal__content">
				<div className="dashboardModal__container">
					<div className="dashboardModal__wrapper">
						{loading && <div className="dashboardModal__loader"></div>}
						<iframe
							loading="lazy"
							allowFullScreen={true}
							className="dashboardModal__iframe"
							src={`https://iframe.mediadelivery.net/embed/${
								import.meta.env.PUBLIC_VIDEO_LIBRARY_ID
							}/${videoId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`}
							onLoad={(event) => {
								setLoading(false);
								event.currentTarget.style.opacity = "1";
							}}
						></iframe>
					</div>
				</div>
			</div>
		</div>
	);
};
