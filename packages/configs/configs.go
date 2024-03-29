package configs

import (
	"encoding/json"
	"errors"
	"reflect"
)

type Source interface {
	Load() (map[string]interface{}, error)
}

type ConfigOption func(*configs)

type configs struct {
	sources []Source
	values  map[string]interface{}
}

func WithSource(source ...Source) ConfigOption {
	return func(c *configs) {
		c.sources = append(c.sources, source...)
	}
}

func New(opts ...ConfigOption) *configs {
	options := configs{
		sources: make([]Source, 0),
		values:  map[string]interface{}{},
	}

	for _, opt := range opts {
		opt(&options)
	}

	return &options
}

func (c *configs) Load() error {
	for _, s := range c.sources {
		values, err := s.Load()
		if err != nil {
			return err
		}

		for k, v := range values {
			c.values[k] = v
		}
	}

	return nil
}

func (c *configs) Parse(v interface{}) error {
	if reflect.ValueOf(v).Kind() != reflect.Ptr {
		return errors.New("dest struct must be a pointer")
	}

	data, err := json.Marshal(c.values)
	if err != nil {
		return err
	}

	return json.Unmarshal(data, v)
}
