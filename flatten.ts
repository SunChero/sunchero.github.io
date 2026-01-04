import { $ } from "bun";
import { readdir, stat, rm, mkdir, rename } from "node:fs/promises";
import { join, dirname, basename, extname } from "node:path";

const REPO_URL = "https://github.com/crypt0rr/kb.git";
const TEMP_CLONE_DIR = "./temp_kb_repo";
const FINAL_DOCS_DIR = "./docs";

async function flattenStructure(dir: string) {
  const items = await readdir(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const s = await stat(fullPath).catch(() => null);
    if (!s) continue;

    if (s.isDirectory()) {
      const indexPath = join(fullPath, "index.md");
      const hasIndex = await Bun.file(indexPath).exists();

      if (hasIndex) {
        const parentDir = dirname(fullPath);
        const folderName = basename(fullPath);
        const newMdPath = join(parentDir, `${folderName}.md`);

        console.log(`📦 Flattening: ${folderName}`);

        let content = await Bun.file(indexPath).text();
        content = content.replace(/\.?\/?images\//g, "./");
        content = content.replace(/\.?\/?files\//g, "./");

        for (const sub of ["images", "files"]) {
          const subPath = join(fullPath, sub);
          if (await stat(subPath).catch(() => false)) {
            const assets = await readdir(subPath);
            for (const asset of assets) {
              const oldAssetPath = join(subPath, asset);
              let newAssetPath = join(parentDir, asset);

              if (await Bun.file(newAssetPath).exists()) {
                const ext = extname(asset);
                const name = basename(asset, ext);
                const uniqueName = `${folderName}_${name}${ext}`;
                newAssetPath = join(parentDir, uniqueName);
                content = content.replace(new RegExp(`./${asset}`, 'g'), `./${uniqueName}`);
              }
              await rename(oldAssetPath, newAssetPath);
            }
          }
        }

        await Bun.write(newMdPath, content);
        await rm(fullPath, { recursive: true, force: true });
      } else {
        await flattenStructure(fullPath);
      }
    }
  }
}

async function runMigration() {
  try {
    // Check for git
    const gitCheck = await $`which git`.quiet();
    if (gitCheck.exitCode !== 0) {
        console.error("❌ Git is not installed. Please run: sudo apt install git -y");
        return;
    }

    await $`rm -rf ${TEMP_CLONE_DIR}`;
    console.log(`\n📂 Cloning ${REPO_URL} into WSL...`);
    await $`git clone --depth 1 ${REPO_URL} ${TEMP_CLONE_DIR}`;

    await mkdir(FINAL_DOCS_DIR, { recursive: true });

    const sourceContent = join(TEMP_CLONE_DIR, "content");
    console.log(`\n🚚 Moving content folder...`);
    // Use the shell for a cleaner wildcard move
    await $`cp -r ${sourceContent}/* ${FINAL_DOCS_DIR}`;

    console.log(`\n🔨 Flattening structure...`);
    await flattenStructure(FINAL_DOCS_DIR);

    await rm(TEMP_CLONE_DIR, { recursive: true, force: true });
    console.log("\n✅ Success! Files are ready for Astro Starlight.");

  } catch (error) {
    console.error("\n❌ Migration failed:", error);
  }
}

runMigration();