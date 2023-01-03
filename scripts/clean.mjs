import { rmSync } from "fs";

rmSync("app", { recursive: true, force: true });
rmSync("dist", { recursive: true, force: true });
