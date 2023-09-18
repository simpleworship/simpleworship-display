package main

import (
	"context"

	"github.com/koron/go-ssdp"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) GetServers() map[string]string {

	servers := make(map[string]string)

	list, err := ssdp.Search("simpleworship:main", 1, "")
	if err != nil {
		panic(err)
	}
	for _, s := range list {
		if s.Type == "simpleworship:main" {
			servers[s.USN] = s.Location
		}
	}

	return servers
}
