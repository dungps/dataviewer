package yaml

import (
	"dataviewer/packages/configs"
	"errors"
	"os"

	yaml2 "gopkg.in/yaml.v3"
)

type YAMLOption func(*yaml)

func WithSource(s string) YAMLOption {
	return func(y *yaml) {
		y.source = s
	}
}

func New(opts ...YAMLOption) configs.Source {
	o := yaml{}

	for _, opt := range opts {
		opt(&o)
	}

	return &o
}

type yaml struct {
	source string
}

// Load implements configs.Source.
func (y *yaml) Load() (map[string]interface{}, error) {
	if len(y.source) == 0 {
		return nil, errors.New("missing config source")
	}

	_, err := os.Stat(y.source)
	if err != nil {
		return nil, err
	}

	c, err := os.ReadFile(y.source)
	if err != nil {
		return nil, err
	}

	var values map[string]interface{}

	if err = yaml2.Unmarshal(c, &values); err != nil {
		return nil, err
	}

	return values, nil
}
