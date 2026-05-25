import { readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const distDir = resolve("dist");
const templatePath = resolve(distDir, "index.html");
const serverEntryPath = resolve(distDir, "server", "entry-server.js");
const sitemapPath = resolve(distDir, "sitemap.xml");

const template = await readFile(templatePath, "utf8");
const { render } = await import(pathToFileURL(serverEntryPath).href);

const appHtml = render();
const output = template.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`,
);

const lastModified = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://hedigardi.com/</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

await writeFile(templatePath, output, "utf8");
await writeFile(sitemapPath, sitemap, "utf8");
await rm(resolve(distDir, "server"), { recursive: true, force: true });
