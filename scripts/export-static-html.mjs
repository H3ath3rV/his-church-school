import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const distPublicDir = path.resolve(process.cwd(), "dist", "public");
const docsDir = path.resolve(process.cwd(), "docs");
const sourceIndexPath = path.join(distPublicDir, "index.html");
const standaloneRoutes = ["about", "academic", "school-life", "contact", "404"];

const html = await readFile(sourceIndexPath, "utf8");
const nestedRouteHtml = html.replaceAll("./assets/", "../assets/");

for (const route of standaloneRoutes) {
  const routeDir = path.join(distPublicDir, route);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), nestedRouteHtml);
  await writeFile(path.join(distPublicDir, `${route}.html`), html);
}

await rm(docsDir, { recursive: true, force: true });
await cp(distPublicDir, docsDir, { recursive: true });
await writeFile(path.join(docsDir, ".nojekyll"), "");
