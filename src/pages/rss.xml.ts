import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const get = async () => {
    const posts = await getCollection("projects", ({ data }) => {
        return !data.draft && data.publishDate < new Date();
    });

    // Sort content entries by publication date
    posts.sort(function (a, b) {
        return b.data.publishDate.valueOf() - a.data.publishDate.valueOf();
    });

    return rss({
        title: `Chance Software LLC - Projects`,
        description: "Projects by Chance Software LLC",
        site: import.meta.env.SITE,

        items: posts.map((post) => ({
            link: post.slug,
            title: post.data.title,
            description: post.data.snippet,
            pubDate: post.data.publishDate,
        })),
    });
};
