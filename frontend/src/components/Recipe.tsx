import RecipeDetails from "./RecipeDetails";
import { useState } from "react";
import { recipe } from "../models/recipe";
import { Card, Button, Col, Row } from "react-bootstrap";

import "./Recipe.css";

const Recipe: React.FC<recipe> = (props) => {

  const [modalShow, setModalShow] = useState(false);
  const [singleRecipe, setSingleRecipe] = useState<
    | [{ name: string; ingredient_quantity: number; measurement: string }]
    | undefined
  >();

  const modalHandler = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/quantities/${props.recipe_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Something went wrong... \n ${response.statusText}`);
      }
      const data = await response.json();
      setSingleRecipe(data);
      setModalShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async () =>{

    try {
      const response = await fetch(
        `http://127.0.0.1:3000/recipes/${props.recipe_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Something went wrong... \n ${response.statusText}`);
      }
     
      window.location.reload();
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <Card
      style={{ width: "20rem" }}
      className="card_recipe my-4 mx-5"
      border="dark"
    >
      <Card.Img
        className="mt-3 thumbnail"
        variant="top"
        src={props.image}
        style={{ objectFit: "cover", height: "300px" }}
      />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle className="my-4 fw-bold">{props.c_name}</Card.Subtitle>

        <Row>
          <Col className="mb-3">
            {" "}
            <Card.Text>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.5em"
                viewBox="0 0 576 512"
              >
                <path d="M240 144A96 96 0 1 0 48 144a96 96 0 1 0 192 0zm44.4 32C269.9 240.1 212.5 288 144 288C64.5 288 0 223.5 0 144S64.5 0 144 0c68.5 0 125.9 47.9 140.4 112h71.8c8.8-9.8 21.6-16 35.8-16H496c26.5 0 48 21.5 48 48s-21.5 48-48 48H392c-14.2 0-27-6.2-35.8-16H284.4zM144 80a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM400 240c13.3 0 24 10.7 24 24v8h96c13.3 0 24 10.7 24 24s-10.7 24-24 24H280c-13.3 0-24-10.7-24-24s10.7-24 24-24h96v-8c0-13.3 10.7-24 24-24zM288 464V352H512V464c0 26.5-21.5 48-48 48H336c-26.5 0-48-21.5-48-48zM48 320h80 16 32c26.5 0 48 21.5 48 48s-21.5 48-48 48H160c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V336c0-8.8 7.2-16 16-16zm128 64c8.8 0 16-7.2 16-16s-7.2-16-16-16H160v32h16zM24 464H200c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
              </svg>
              <span> {props.prep_time}</span> min
            </Card.Text>
          </Col>
          <Col>
            <Card.Text>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.5em"
                viewBox="0 0 640 512"
              >
                <path d="M293.5 3.8c19.7 17.8 38.2 37 55.5 57.7c7.9-9.9 16.8-20.7 26.5-29.5c5.6-5.1 14.4-5.1 20 0c24.7 22.7 45.6 52.7 60.4 81.1c14.5 28 24.2 58.8 24.2 79C480 280 408.7 352 320 352c-89.7 0-160-72.1-160-159.8c0-26.4 12.7-60.7 32.4-92.6c20-32.4 48.1-66.1 81.4-95.8c2.8-2.5 6.4-3.8 10-3.7c3.5 0 7 1.3 9.8 3.8zM370 273c30-21 38-63 20-96c-2-4-4-8-7-12l-36 42s-58-74-62-79c-30 37-45 58-45 82c0 49 36 78 81 78c18 0 34-5 49-15zM32 288c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32s-14.3 32-32 32v64H544V320c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32v96c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32V288zM320 480a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm160-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM192 480a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
              </svg>
              <span> {props.cook_time}</span> min
            </Card.Text>
          </Col>
        </Row>

        <Row className="button_container mx-auto d-flex justify-content-around mt-4">
          <Col className="d-flex justify-content-center">
            <Button className="px-4" variant="primary" onClick={modalHandler}>
              More...
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button
              className="px-4"
              variant="outline-danger"
              onClick={deleteHandler}
            >
              Delete
            </Button>
          </Col>
        </Row>

        <RecipeDetails
          show={modalShow}
          showHandler={() => setModalShow(false)}
          recipeIngredients={singleRecipe}
          recipeName={props.name}
          recipeInstructions={props.instructions}
        />
      </Card.Body>
    </Card>
  );
};

export default Recipe;
