import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "1mi2mi",
        short_name: "1mi2mi",
        description: "1mi2mi",
        start_url: "/",
        display: "standalone",
        background_color: "#000",
        orientation: "portrait",
        scope: "/",
        lang: "tr",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "64x64",
                type: "image/x-icon",
                purpose: "maskable",
            },
            {
                src: "/icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
        related_applications: [],
        prefer_related_applications: false,
    };
}