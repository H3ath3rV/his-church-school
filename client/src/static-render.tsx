import { renderToString } from "react-dom/server";
import App from "./App";

export function renderStaticPage(path: string) {
  return renderToString(<App ssrPath={path} />);
}
