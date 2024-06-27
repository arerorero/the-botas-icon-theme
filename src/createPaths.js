import fs from "fs/promises"

export async function createPaths() {
  let icons = await fs.readFile("./icons.json", "utf-8")
  icons = JSON.parse(icons)

  let iconDefinitions = {}

  const directories = await fs.readdir("./images")
  await Promise.all(
    directories.map(async (directory) => {
      const files = await fs.readdir(`./images/${directory}`)
      files.forEach((file) => {
        const name = `_${file.split(".")[0].toLowerCase()}`
        const route = `./images/${directory}/${file}`
        iconDefinitions[name] = {
          iconPath: route,
        }
      })
    })
  )
  icons.iconDefinitions = iconDefinitions
  await fs.writeFile("./icons.json", JSON.stringify(icons, null, 2))
}
