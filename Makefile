start:
	wails dev

build:
	wails build

install:
	go install github.com/wailsapp/wails/v2/cmd/wails@latest

test:
	go test -v ./...