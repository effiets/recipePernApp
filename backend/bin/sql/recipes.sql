CREATE TABLE courses(
	course_id serial PRIMARY KEY,
    name varchar(50)
);

CREATE TABLE ingredients (
    ingredient_id serial primary key,
    name varchar(50)
);


CREATE TABLE recipes(
    recipe_id serial primary key,
    course_id int,
    name varchar(100),
   prep_time time,
   cook_time time,
   instructions text,
   FOREIGN key (course_id) references courses (course_id)
);


CREATE TABLE quantity (
	quantity_id serial PRIMARY KEY,
	recipe_id INT,
	ingredient_id INT,
	measurement VARCHAR (50) NOT NULL,
    ingredient_quantity INT,
 FOREIGN KEY (recipe_id)
      REFERENCES recipes (recipe_id),
  FOREIGN KEY (ingredient_id)
      REFERENCES ingredients (ingredient_id)
);



INSERT INTO
    courses (name)
VALUES
   ('Breakfast'),
    ('Brunch'),
    ('Main Course'),
    ('Dessert');

INSERT INTO ingredients (name)
VALUES
    ('Egg'),
    ('Salt'),
    ('Sugar'),
    ('Chocolate'),
    ('Vanilia Extact'),
    ('Flour'),
    ('Chicken'),
    ('Potatos'),
    ('Pork'),
    ('Olive oil');


INSERT INTO
    recipes (name, instructions, prep_time, cook_time, course_id)
VALUES
    (
        'Boiled Egg',
        'Add egg to cold water. Bring water to boil. Cook.',
        '00:01:00',
        '00:05:00',
        1
    ),
    (
        'Chocolate Cake',
        'Add eggs, flour, chocolate to pan. Bake at 350 for 1 hour',
         '00:15:00',
        '00:45:04',
        4
    ), (
        'Chicken and Potatoes with Dijon Cream Sauce',
    'Put the chicken on one half of the skillet and the potatoes on the other half. Let everything cook for 3-4 minutes on this first side, then flip just the chicken to let it brown on the other side another 3-4 minutes. Take both the chicken and the potatoes off the skillet and put them on a plate. Cover and keep them warm while you make the cream sauce for chicken.',
      '00:45:00',
        '01:15:04',
        3
    );


    INSERT INTO
    quantity (recipe_id, ingredient_id, measurement, ingredient_quantity)
VALUES
   (1 , 1 , 'Pieces', 1),
    (2,1, 'Pieces', 2),
    (2 ,3, 'Cups', 1),
   (2 ,4, 'Tbsp', 2),
   (2 ,5, 'tsp', 1),
   (2 ,6, 'Cups', 2),
   (3 ,2, 'tsp', 2),
   (3 ,7, 'gramms', 500),
   (3 ,8, 'Pieces', 4),
   (3 ,10, 'tsp', 3),
   (3 ,6, 'cups', 1),
   (3 ,1, 'Pieces', 1);


