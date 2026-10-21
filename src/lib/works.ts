import gameniImg from "../assets/gameni_icon.png";
import wipImg from "../assets/wip.jpg";

export type Work = {
	title: string; // タイトル
	img: ImageMetadata; // サムネイル
	id: string; // id(リンクが /works/id/ になる)
	tags: string[]; // タグ
	post?: string; // 紹介Post (Blog内のリンクの絶対パス)
	description: string;
};

type WorkMetadata = {
	dir: "den" | "studio" | "lab" | "none";
	work: Work;
};

export const works: WorkMetadata[] = [
	{
		dir: "studio",
		work: {
			title: "ガメニのひまつぶし",
			img: gameniImg,
			id: "gameni",
			tags: ["iOS", "Game"],
			post: "/blog/c/gameni",
			description: "複数のミニゲームを収録したiOSアプリ。",
		},
	},
	{
		dir: "lab",
		work: {
			title: "工事中",
			img: wipImg,
			id: "/lab",
			tags: [],
			description: "現在工事中（イラスト: Unsplash）",
		},
	},
	{
		dir: "den",
		work: {
			title: "工事中",
			img: wipImg,
			id: "/den",
			tags: [],
			description: "現在工事中（イラスト: Unsplash）",
		},
	},
];
