package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/FelipeMatthew/SmartMart/internal/database"
	"github.com/FelipeMatthew/SmartMart/internal/service"
	"github.com/FelipeMatthew/SmartMart/internal/webserver"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_"github.com/go-sql-driver/mysql"
)

func main() {

	// Database Conn
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/smartmart")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	// Database + Service
	categoryDB := database.NewCategoryDB(db)
	categoryService := service.NewCategoryService(*categoryDB)

	// Database + Service
	productDB := database.NewProductDB(db)
	productService := service.NewProductService(*productDB)

	// WebServer
	webCategoryHandler := webserver.NewWebCategoryHandler(categoryService)
	webProductHandler := webserver.NewWebProductHandler(productService)

	// Routes
	c := chi.NewRouter()

	// Middlewares
	c.Use(middleware.Logger)
	c.Use(middleware.Recoverer)

	// Category Routes
	c.Get("/category/{id}", webCategoryHandler.GetCategory)
	c.Get("/category", webCategoryHandler.GetCategories)
	c.Post("/category", webCategoryHandler.CreateCategory)

	// Products Routes
	c.Get("/product/{id}", webProductHandler.GetProduct)
	c.Get("/product", webProductHandler.GetProducts)
	c.Get("/product/category/{categoryID}", webProductHandler.GetProductByCategoryID)
	c.Post("/product", webProductHandler.CreateProduct)

	// Listen
	fmt.Println("Server is running on port 8080")
	http.ListenAndServe(":8080", c)


}
