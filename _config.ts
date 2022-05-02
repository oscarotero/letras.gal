import lume from "lume/mod.ts";
import binaryLoader from "lume/core/loaders/binary.ts";

const site = lume()
  .ignore("README.md")
  .loadPages([".html"])
  .loadAssets([".jpg"], binaryLoader)
  .copy("styles.css");

export default site;
