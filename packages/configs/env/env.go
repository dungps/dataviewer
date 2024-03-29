package env

import (
	"dataviewer/packages/configs"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

type EnvOption func(*env)

type env struct {
	sources []string
}

func WithSource(s ...string) EnvOption {
	return func(e *env) {
		e.sources = append(e.sources, s...)
	}
}

func New(opts ...EnvOption) configs.Source {
	e := env{
		sources: make([]string, 0),
	}

	for _, opt := range opts {
		opt(&e)
	}

	return &e
}

// Load implements configs.Source.
func (e *env) Load() (map[string]interface{}, error) {
	values := map[string]interface{}{}

	if len(e.sources) > 0 {
		for _, s := range e.sources {
			_, err := os.Stat(s)
			if err == nil {
				err = godotenv.Load(s)
				if err != nil {
					return nil, err
				}
			}
		}
	}

	for _, env := range os.Environ() {
		var k, v string
		subs := strings.SplitN(env, "=", 2)
		k = strings.ToLower(subs[0])
		if strings.HasPrefix(k, "_") {
			continue
		}

		if len(subs) > 1 {
			v = subs[1]
		}

		if len(k) != 0 {
			values[k] = v
		}
	}

	return values, nil
}
