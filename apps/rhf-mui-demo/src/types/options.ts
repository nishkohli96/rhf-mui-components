export type PageInfo = {
	title: string;
	href: string;
}

export type Page = PageInfo & { pages?: PageInfo[]}
