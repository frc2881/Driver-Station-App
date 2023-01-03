import { mkdirSync, copyFileSync } from "fs";

mkdirSync("app/ui", { recursive: true });

[ "index.html", "global.css" ].forEach((fileName) => {
  copyFileSync(`src/ui/${fileName}`, `app/ui/${fileName}`);
});
