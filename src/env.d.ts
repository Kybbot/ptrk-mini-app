/// <reference path="../.astro/types.d.ts" />

interface Window {
	Telegram: Telegram;
}

interface ImportMetaEnv {
	readonly PUBLIC_API_URL: string;
	readonly PUBLIC_VIDEO_LIBRARY_ID: string;
	readonly PUBLIC_GOOGLE_CLIENT_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
