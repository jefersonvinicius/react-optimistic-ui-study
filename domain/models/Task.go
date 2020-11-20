package models

import "time"

// Task model
type Task struct {
	ID        uint      `gorm:"primarykey" json:"id"`
	Label     string    `json:"label"`
	Completed bool      `json:"completed"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
