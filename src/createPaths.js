import fs from "fs/promises";

export async function createPaths() {
  let icons = await fs.readFile("./icons.json", "utf-8");
  icons = JSON.parse(icons);
  let iconDefinitions = {};

  const files = await getFilesAndPaths("./images");

  files.forEach((file) => {
    if (file) {
      const path = file.split(" - ")[1];
      const name = file.split(" - ")[0];
      iconDefinitions[`_${name.toLowerCase().split(".")[0]}`] = {
        iconPath: `${path}/${name}`,
      };
    }
  });

  icons.iconDefinitions = iconDefinitions;
  await fs.writeFile("./icons.json", JSON.stringify(icons, null, 2));
}

async function getFilesAndPaths(path) {
  const documents = await fs.readdir(path);
  const folders = documents.filter((file) => !file.split(".")[1]);
  var files = documents.map((file) => {
    if (file.split(".")[1]) {
      return `${file} - ${path}`;
    }
  });
  if (folders.length != 0) {
    await Promise.all(
      folders.map(async (folder) => {
        const folderFiles = await getFilesAndPaths(`${path}/${folder}`);
        files = files.concat(folderFiles);
      })
    );
  }
  return files.sort();
}
