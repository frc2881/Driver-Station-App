import { mkdirSync, copyFileSync } from "fs";
import fse from "fs-extra";

mkdirSync("app/ui", { recursive: true });

[ "index.html", "global.css" ].forEach((fileName) => {
  copyFileSync(`src/ui/${fileName}`, `app/ui/${fileName}`);
});

fse.copySync("src/ui/assets", "app/ui/assets");
