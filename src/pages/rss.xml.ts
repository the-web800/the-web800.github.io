// Thanks @delucis - https://github.com/delucis/astro-blog-full-text-rss/

import { loadRenderers } from "astro:container";
import { getCollection, render } from "astro:content";
import { getContainerRenderer as getMdxRenderer } from "@astrojs/mdx/container-renderer";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { experimental_AstroContainer } from "astro/container";
import { transform, walk } from "ultrahtml";
import sanitize from "ultrahtml/transformers/sanitize";

export async function GET(context: APIContext) {
	if (!context.site) {
		throw new Error("context.site is undefined");
	}
	const baseUrl = context.site.toString().replace(/\/$/, "");
	const renderers = await loadRenderers([getMdxRenderer()]);
	const container = await experimental_AstroContainer.create({ renderers });

	const blogRaw = await getCollection("blog");
	const blog = blogRaw
		.filter((post) => !post.data.tags.includes("_other"))
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	const items = await Promise.all(
		blog.map(async (post) => {
			const { Content } = await render(post);
			const rawHtml = await container.renderToString(Content);
			// DOCTYPE htmlを消して、hrefとsrcのリンクを絶対パスにして、scriptとstyleを消す
			console.log(rawHtml);
			const content = await transform(rawHtml.replace(/^<!DOCTYPE html>/, ""), [
				async (node) => {
					await walk(node, (node) => {
						if (node.name === "a" && node.attributes.href?.startsWith("/")) {
							node.attributes.href = baseUrl + node.attributes.href;
						}
						if (node.name === "img" && node.attributes.src?.startsWith("/")) {
							node.attributes.src = baseUrl + node.attributes.src;
						}
					});
					return node;
				},
				sanitize({ dropElements: ["script", "style", "link"] }),
			]);
			return {
				...post.data,
				// post.data: {
				//     title: string;
				//     pubDate: Date;
				//     tags: string[];
				//     description?: string | undefined;
				//     updatedDate?: Date | undefined;
				// }

				link: `/blog/c/${post.id}/`,
				categories: post.data.tags,
				content,
			};
		}),
	);
	return rss({
		title: "House800 Blog",
		description: "Web800が運営する、様々なジャンルを扱う個人ブログ。",
		site: context.site,
		items,
		customData: `<language>ja-JP</language>`,
	});
}
