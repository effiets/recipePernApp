#!/bin/bash



echo "Configuring database: recipes"

dropdb -U efi recipes
createdb -U efi recipes

psql -U efi -d recipes -a -f ./bin/sql/recipes.sql

echo "recipes Configured!!!"