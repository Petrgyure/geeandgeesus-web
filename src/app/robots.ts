import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/profil/", "/manage.html"],
      },
    ],
    sitemap: "https://www.geeandgeesus.cz/sitemap.xml",
  };
}
