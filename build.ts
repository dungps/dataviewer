import type { PluginBuilder } from "bun"
import { rm } from "node:fs/promises"
import { join, basename } from "node:path"
import Postcss from "postcss"

const distDir = join(import.meta.dir, "web", "dist")

await rm(distDir, { recursive: true })

const result = await Bun.build({
    entrypoints: [join(import.meta.dir, "./web/src/main.tsx")],
    target: "browser",
    sourcemap: "external",
    minify: true,
    outdir: join(distDir, "assets"),
    naming: `[dir]/[name].[hash].[ext]`,
    plugins: [
        {
            name: "postcss",
            target: "browser",
            setup(build: PluginBuilder): void | Promise<void> {
                build.onResolve({ filter: /\.css$/, namespace: "file" }, async (args) => {
                    const postCss = Postcss([
                        require("autoprefixer")(),
                        require("tailwindcss")({
                            content: [join(import.meta.dir, "web/src/**/*.{js,ts,jsx,tsx}")],
                            theme: {
                                extend: {}
                            },
                            darkMode: "class",
                            plugins: [require("daisyui")]
                        }),
                        require("cssnano")()
                    ])

                    const url = Bun.pathToFileURL(args.importer)
                    const filePath = Bun.fileURLToPath(new URL(args.path, url))
                    const cssContent = await Bun.file(filePath).text()
                    const compiled = await postCss.process(cssContent)
                    const o = join(distDir, "cache", `main.css`)
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
}

let cssPath
let jsPath

for (const o of result.outputs) {
    if (o.kind === "entry-point") {
        jsPath = o.path.replace(distDir, "")
    }

    if (o.kind === "asset" && o.type.includes("text/css")) {
        cssPath = o.path.replace(distDir, "")
    }
}

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Dataviewer</title>
	<link rel="stylesheet" href="${cssPath}">
</head>
<body>
<div id="root"></div>
<script src="${jsPath}"></script>
</body>
</html>
`

await Bun.write(join(distDir, "index.html"), htmlTemplate)

await rm(join(distDir, "cache"), { recursive: true })
