import { Row } from "react-bootstrap";
import { recipe } from "../models/recipe";
import { course } from "../models/course";
import Recipe from "./Recipe";
import { useState, useEffect } from "react";

import './RecipesList.css'

const RecipesList: React.FC<{
  term: string | undefined | null;
  courseTerm: number | undefined | null;
}> = (props) => {

  let url = `http://127.0.0.1:3000/recipes/`;
  if (props.term) {
    url = url + `?term=` + props.term;
  }
  if (props.courseTerm) {
    url = url + `?course=` + props.courseTerm;
  }

  useEffect(() => {
    fetchRecipeHandler(url);
  }, [url]);
  const fetchRecipeHandler = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (!response.ok) {
        throw new Error(`Something went wrong... \n ${response.statusText}`);
      }
      const data = await response.json();

      setRecipes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [recipes, setRecipes] = useState<recipe[] & course[]>([]);

  return (
    <Row className="d-flex justify-content-around">
      {recipes.map((item) => (
        <Recipe
          key={item.recipe_id}
          recipe_id={item.recipe_id}
          name={item.name}
          instructions={item.instructions}
          course_id={item.course_id}
          cook_time={item.cook_time}
          prep_time={item.prep_time}
          c_name={item.c_name}
          image={item.image}
          // onDeleteRecipe={()=>fetchRecipeHandler(url)}
        ></Recipe>
      ))}
    </Row>
  );
};
export default RecipesList;
