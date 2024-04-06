package main

import (
	"dataviewer/package/webview"
	"embed"

	"github.com/progrium/macdriver/macos"
	"github.com/progrium/macdriver/macos/appkit"
)

//go:embed public/index.html public/assets/*.js public/assets/*.css
var assetsFS embed.FS

func main() {
	macos.RunApp(func(app appkit.Application, delegate *appkit.ApplicationDelegate) {
		w := webview.New(true, assetsFS)
		w.SetSize(1028, 768)
		w.Title("Hello World")
		w.Run()

		w.LoadURL("gofs:/public/index.html")

		delegate.SetApplicationShouldTerminateAfterLastWindowClosed(func(appkit.Application) bool {
			return true
		})
		app.SetActivationPolicy(appkit.ApplicationActivationPolicyRegular)
		app.ActivateIgnoringOtherApps(true)
	})
}
