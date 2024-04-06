package webview

import (
	"io/fs"

	"github.com/progrium/macdriver/macos/appkit"
	"github.com/progrium/macdriver/macos/foundation"
	"github.com/progrium/macdriver/macos/webkit"
	"github.com/progrium/macdriver/objc"
)

type WebView interface {
	SetSize(width, height float64)
	Title(title string)
	LoadURL(url string)
	Run()
	Destroy()
	Bind(name string, fn func(message objc.Object) (objc.Object, error))
	Eval(name string, fn func(message objc.Object))
}

func New(debug bool, filesystem fs.FS) WebView {
	yesValue := foundation.Number_NumberWithBool(true)
	config := webkit.NewWebViewConfiguration()
	preferences := webkit.NewPreferences()

	if debug {
		objc.Call[objc.Void](preferences, objc.Sel("setValue:forKey:"), yesValue, "developerExtrasEnabled")
		config.SetPreferences(preferences)
	}

	if filesystem != nil {
		gofsHandler := &webkit.FileSystemURLSchemeHandler{FS: filesystem}
		config.SetURLSchemeHandlerForURLScheme(gofsHandler, "gofs")
	}

	wv := webkit.NewWebViewWithFrameConfiguration(foundation.Rect{}, config)

	if debug {
		objc.Call[objc.Void](wv, objc.Sel("setInspectable:"), yesValue)
	}

	viewController := appkit.NewViewController()
	w := appkit.Window_WindowWithContentViewController(viewController)
	w.SetTitlebarAppearsTransparent(true)

	return &webview{
		w:  w,
		wv: wv,
	}
}

type webview struct {
	w  appkit.Window
	wv webkit.WebView
}

// Eval implements WebView.
func (w *webview) Eval(name string, fn func(message objc.Object)) {
	webkit.AddScriptMessageHandler(w.wv, name, fn)
}

// Bind implements WebView.
func (w *webview) Bind(name string, fn func(message objc.Object) (objc.Object, error)) {
	webkit.AddScriptMessageHandlerWithReply(w.wv, name, fn)
}

// Destroy implements WebView.
func (w *webview) Destroy() {
	w.w.Close()
}

// Title implements WebView.
func (w *webview) Title(title string) {
	w.w.SetTitle(title)
}

// Run implements WebView.
func (w *webview) Run() {
	objc.Retain(&w.w)
	w.w.SetContentView(w.wv)
	w.w.MakeKeyAndOrderFront(w.w)
	w.w.Center()
}

// LoadURL implements WebView.
func (w *webview) LoadURL(url string) {
	webkit.LoadURL(w.wv, url)
}

// SetSize implements WebView.
func (w *webview) SetSize(width float64, height float64) {
	w.w.SetContentSize(foundation.Size{Width: width, Height: height})
}
