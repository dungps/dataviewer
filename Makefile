PWD:= $(shell pwd)

build:
	@echo "Building..."
	@go build -o $(PWD)/dataviewer.app/Contents/MacOS/dataviewer $(PWD)/main.go

run:
	@echo "Running..."
	@bun build index.ts && go build -o $(PWD)/dataviewer.app/Contents/MacOS/dataviewer $(PWD)/main.go && open dataviewer.app

.PHONY: build