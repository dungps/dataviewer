package config

type Config struct {
	Env    string        `json:"env,omitempty"`
	Server *serverConfig `json:"server,omitempty"`
}

type serverConfig struct {
	Port int `json:"port,omitempty"`
}
