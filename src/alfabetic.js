import fs from "fs/promises";

function sortJsonAlfabetically(json) {
  let array = [];
  let newJson = {};
  for (const [key] of Object.entries(json)) {
    array.push(key);
  }

  array.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  array.forEach((element) => {
    newJson[element] = json[element];
  });

  return newJson;
}

export async function alfabetically() {
  let icons = await fs.readFile("./icons.json", "utf-8");
  icons = JSON.parse(icons);

  const array = [
    "fileExtensions",
    "iconDefinitions",
    "folderNames",
    "folderNamesExpanded",
    "fileNames",
  ];
  array.forEach((element) => {
    let name = icons[element];
    name = sortJsonAlfabetically(name);
    icons[element] = name;
  });

  await fs.writeFile("./icons.json", JSON.stringify(icons, null, 2));
}
