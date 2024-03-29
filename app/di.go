package app

import (
	"dataviewer/config"

	"github.com/gofiber/fiber/v3"
	"go.uber.org/dig"
)

func initContainer(conf *config.Config) *dig.Container {
	container := dig.New()

	_ = container.Provide(func() *config.Config {
		return conf
	})

	return container
}

func initRepository(container *dig.Container) error {
	return nil
}

func initUseCase(container *dig.Container) error {
	return nil
}

func initHandlers(f *fiber.App, container *dig.Container) error {
	return container.Invoke(func() {

	})
}
