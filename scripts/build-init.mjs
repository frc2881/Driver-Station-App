import { mkdirSync, copyFileSync, cpSync } from "node:fs";

mkdirSync("app/ui", { recursive: true });
copyFileSync("src/ui/index.html", "app/ui/index.html");
copyFileSync("src/ui/preload.js", "app/ui/preload.js");
cpSync("src/ui/assets", "app/ui/assets", { recursive: true });
