// Usa o design system local (../phsa-design-system) no lugar do publicado no npm.
// Empacota como o `npm publish` faria (só `files` do package.json, sem node_modules: um
// React só no app) e instala em .ds e em node_modules. Depois, reinicie o `next dev`.
import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const app = resolve(import.meta.dirname, "..");
const ds = resolve(app, "../phsa-design-system");
const target = join(app, ".ds");
const installed = join(app, "node_modules/@phsa.tec/design-system-react");

if (!process.argv.includes("--no-build")) execFileSync("npm", ["run", "build"], { cwd: ds, stdio: "inherit" });

const tmp = mkdtempSync(join(tmpdir(), "phsa-ds-"));
const [{ filename }] = JSON.parse(execFileSync("npm", ["pack", "--json", "--pack-destination", tmp], { cwd: ds, encoding: "utf8" }));

rmSync(target, { recursive: true, force: true });
mkdirSync(target);
execFileSync("tar", ["xzf", join(tmp, filename), "-C", target, "--strip-components=1"]);
rmSync(tmp, { recursive: true, force: true });

rmSync(installed, { recursive: true, force: true });
cpSync(target, installed, { recursive: true });
console.log("sync-ds: design system local instalado.");
