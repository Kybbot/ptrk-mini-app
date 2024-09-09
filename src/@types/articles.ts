export interface SmallArticle {
	id: number;
	slug: string;
	title: string;
	file_id: string;
	created_at: number;
}

export interface Article {
	id: number;
	slug: string;
	title: string;
	file_id: string;
	hidden: number;
	created_at: string;
	meta_title: string;
	meta_description: string;
}

export interface FullArticle extends Article {
	photo: string | null;
	dateString: string;
	is_podcasts_available?: number;
}

export interface Links {
	anchor?: string;
	apple?: string;
	google?: string;
	spotify?: string;
	castbox?: string;
	pocketcasts?: string;
	radiopublic?: string;
}
