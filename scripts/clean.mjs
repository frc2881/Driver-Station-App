import { rmSync } from "node:fs";

rmSync("app", { recursive: true, force: true });
rmSync("dist", { recursive: true, force: true });
