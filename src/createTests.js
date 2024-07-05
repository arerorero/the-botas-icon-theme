import fs from "fs/promises"

async function createFolders(icons) {
  const folderNames = icons.folderNames
  for (const [key] of Object.entries(folderNames)) {
    try {
      await fs.access(`./test/${key}`)
    } catch {
      await fs.mkdir(`./test/${key}`)
    }
  }
}

async function createFiles(file, fileName = "") {
  for (const [key] of Object.entries(file)) {
    try {
      await fs.readFile(`./test/${fileName}${key}`, "utf-8")
    } catch {
      fs.writeFile(`./test/${fileName}${key}`, "")
    }
  }
}

export async function createTests() {
  await fs.rm("./test", { recursive: true, force: true })
  await fs.mkdir("./test")
  let icons = await fs.readFile("./icons.json", "utf-8")
  icons = JSON.parse(icons)
  await createFolders(icons)
  await createFiles(icons.fileNames)
  await createFiles(icons.fileExtensions, ".")
}
