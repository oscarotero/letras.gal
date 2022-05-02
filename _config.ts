import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import toc from "./scripts/toc.ts";

export default lume()
  .ignore("README.md")
  .loadPages([".html"])
  .process([".html"], toc)
  .use(postcss());
