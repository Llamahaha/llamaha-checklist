import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const cwd = fileURLToPath(new URL("..", import.meta.url));
for (const args of [["--test", "tests/site-behavior.test.mjs"], ["scripts/audit-site.mjs"], ["scripts/verify-site.mjs"]]) {
  const result = spawnSync(process.execPath, args, { cwd, stdio: "inherit" });
  if (result.error || result.status !== 0) {
    if (result.error) console.error(result.error.message);
    process.exit(result.status ?? 1);
  }
}
