import { MetadataRoute } from "next";


export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin", "/private"],
            },
            {
                userAgent: "Googlebot",
                allow: "/",
                disallow: "/search",
            },
        ],
        sitemap: `https://1mi2mi.com/sitemap.xml`,
        host: "https://1mi2mi.com",
    };
}