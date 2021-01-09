package database

import (
	"log"
	"todolist/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB
var (
	dsn = "user=postgres password=123456 dbname=todolist host=localhost port=5436 sslmode=disable"
)

// Instance : instance
func Instance() *gorm.DB {
	return db
}

// Setup database
func Setup() {
	initDatabase()
	err := Instance().AutoMigrate(&models.Task{})

	if err != nil {
		log.Fatalln(err)
	}
}

func initDatabase() {
	db, _ = gorm.Open(postgres.Open(dsn), &gorm.Config{})
}
