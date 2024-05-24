import { mkdirSync, copyFileSync } from "fs";
import fse from "fs-extra";

const { copySync } = fse;

mkdirSync("app/ui", { recursive: true });
copyFileSync("src/ui/index.html", "app/ui/index.html");
copySync("src/ui/assets", "app/ui/assets");
