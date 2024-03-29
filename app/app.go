package app

import (
	"context"
	"dataviewer/config"
	"dataviewer/packages/configs"
	"dataviewer/packages/configs/env"
	"dataviewer/packages/configs/yaml"
	"fmt"

	"github.com/gofiber/fiber/v3"
)

type App interface {
	Start() error
}

func New(ctx context.Context, configPath string) App {
	cSources := []configs.Source{}

	cSources = append(cSources, env.New(
		env.WithSource(".env"),
		env.WithSource(".env.local"),
	))

	if configPath != "" {
		cSources = append(cSources, yaml.New(yaml.WithSource(configPath)))
	}

	var config config.Config
	c := configs.New(
		configs.WithSource(
			cSources...,
		),
	)

	if err := c.Load(); err != nil {
		panic(err)
	}

	if err := c.Parse(&config); err != nil {
		panic(err)
	}

	container := initContainer(&config)

	if err := initRepository(container); err != nil {
		panic(err)
	}

	if err := initUseCase(container); err != nil {
		panic(err)
	}

	f := fiber.New()

	if err := initHandlers(f, container); err != nil {
		panic(err)
	}

	return &app{
		ctx:    ctx,
		config: &config,
		fiber:  f,
	}
}

type app struct {
	ctx    context.Context
	config *config.Config
	fiber  *fiber.App
}

// Start implements App.
func (a *app) Start() error {
	port := 3000
	if a.config.Server.Port != 0 {
		port = a.config.Server.Port
	}
	return a.fiber.Listen(fmt.Sprintf(":%d", port))
}
