package models

import "time"

// Task model
type Task struct {
	ID        uint `gorm:"primarykey"`
	Label     string
	Completed bool
	CreatedAt time.Time
	UpdatedAt time.Time
}
