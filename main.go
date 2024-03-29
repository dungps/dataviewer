package main

import (
	"context"
	"dataviewer/app"
	"flag"
)

var configPath string

func init() {
	flag.StringVar(&configPath, "config", "./conf.yml", "path to config file")
	flag.Parse()

}

func main() {
	a := app.New(context.Background(), configPath)

	if err := a.Start(); err != nil {
		panic(err)
	}
}
