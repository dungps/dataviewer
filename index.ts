import type { PluginBuilder } from "bun"
import postcss from "postcss"
import { join, basename, extname } from "path"
import { rm } from "fs/promises"
import tailwindcssConfig from "./tailwind.config"

await rm(join(import.meta.dir, "public", "assets"), { recursive: true })

const pcc = postcss([
    require("tailwindcss")(tailwindcssConfig),
    require("autoprefixer"),
    require("cssnano")
])

const result = await Bun.build({
    entrypoints: ["./web/index.tsx"],
    target: "browser",
    sourcemap: "inline",
    minify: true,
    outdir: "./public/assets",
    naming: "[dir]/[name]-[hash].[ext]",
    plugins: [
        {
            name: "postcss",
            target: "browser",
            async setup(build: PluginBuilder): Promise<void> {
                build.onResolve({ filter: /\.css$/, namespace: "file" }, async (args) => {
                    const url = Bun.pathToFileURL(args.importer)
                    const filePath = Bun.fileURLToPath(new URL(args.path, url))
                    const cssContent = await Bun.file(filePath).text()
                    const compiled = await pcc.process(cssContent, {
                        map: { inline: true }
                    })
                    const fileName = basename(args.path).replace(extname(args.path), "")
                    const o = join(import.meta.dir, ".cache", "assets", `${fileName}.css`)
                    await Bun.write(o, compiled.css)

                    return {
                        ...args,
                        path: o
                    }
                })
            }
        }
    ]
})

if (!result.success) {
    console.error(result.logs)
    process.exit(1)
}

let cssPath
let jsPath

for (const o of result.outputs) {
    if (o.kind === "entry-point") {
        jsPath = o.path.replace(import.meta.dir, "")
    }

    if (o.kind === "asset" && o.type.includes("text/css")) {
        cssPath = o.path.replace(import.meta.dir, "")
    }
}

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
	<link rel="stylesheet" href="gofs:${cssPath}">
</head>
<body>
<div id="root"></div>
<script src="gofs:${jsPath}"></script>
</body>
</html>
`

await Bun.write(join(import.meta.dir, "public", "index.html"), htmlTemplate)

await rm(join(import.meta.dir, ".cache"), { recursive: true })
