import { useRef, useState } from "react";
import AddIngredient from "./AddIngredients";
import { course } from "../models/course";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, FormLabel, FormControl } from "react-bootstrap";

import "./AddRecipe.css"

const AddRecipe: React.FC<{
  courseList: course[] | undefined;
  onAddRecipe: () => void;
}> = (props) => {
  const [createRecipe, setCreateRecipe] = useState(false);
  const [addInstructions, setAddInstructions] = useState(false);
  const [newRecipeId, setNewRecipeId] = useState<number | null>(null);

  const [courseVal, setCourseVal] = useState<number | undefined | string>();

  const nameRef = useRef<HTMLInputElement>(null);
  const instructionsRef = useRef<HTMLTextAreaElement>(null);
  const prepTimeRef = useRef<HTMLInputElement>(null);
  const cookTimeRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const instructionsHandler = () => {
    setAddInstructions(!addInstructions);
  };

  const createNewRecipeHandler = async () => {
    const enteredName = nameRef.current!.value;
    const enteredCourse = courseVal!;

    if (!enteredName || !enteredCourse) {
      setCreateRecipe(false);
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:3000/recipes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: enteredName,
          course_id: enteredCourse,
        }),
      });
      if (!response.ok) {
        throw new Error(`Something went wrong... \n ${response.statusText}`);
      }
      const data = await response.json();
      setCreateRecipe(true);
      setNewRecipeId(data.recipe_id);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async () => {
    const enteredInstructions = instructionsRef.current?.value;
    const enteredPrepTime = prepTimeRef.current?.value;
    const enteredCookTime = cookTimeRef.current?.value;
    const enteredImage = imageRef.current?.value;


    try {
      const response = await fetch(
        `http://127.0.0.1:3000/recipes/${newRecipeId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            instructions: enteredInstructions,
            prep_time: enteredPrepTime,
            cook_time: enteredCookTime,
            image: enteredImage,
          }),
        }
      );


      if (!response.ok) {
        throw new Error(`Something went wrong... \n ${response.statusText}`);
      }
      const data = await response.json();

      console.log(data);
      props.onAddRecipe();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="my-4 border p-4">
      <Form >
        <Row className='d-flex flex-md-row flex-column'>
          <Col className='column_container'>
            <Form.Control
              type="text"
              placeholder="Enter recipe Name"
              ref={nameRef}
              disabled={createRecipe}
              required
            />
          </Col>

          <Col className='column_container'>
            <Form.Select
              required
              disabled={createRecipe}
              onChange={(e) => {
                setCourseVal(e.target.value);
              }}
            >
              <option value={""}>Search by Course: </option>
              {props.courseList?.map((item) => (
                <option key={item.c_name} value={item.course_id}>
                  {item.c_name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col className='column_container'>
            <Button onClick={createNewRecipeHandler} disabled={createRecipe}>
              Ready? Add Ingredients
            </Button>
          </Col>
        </Row>
        {createRecipe && (
          <AddIngredient
            id={newRecipeId}
            onAddInstructions={instructionsHandler}
          />
        )}

        {addInstructions && (
          <Container>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Row>
                <Col>
                  <FormLabel>Preperation Time</FormLabel>
                  <FormControl type="number" min="0" ref={prepTimeRef} />
                </Col>{" "}
                <Col>
                  {" "}
                  <FormLabel>Cook Time</FormLabel>
                  <FormControl type="number" min="0" ref={cookTimeRef} />
                </Col>
              </Row>

              <Row>
                <Form.Label>Inctructions:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  cols={12}
                  placeholder="Please pass the instructions"
                  ref={instructionsRef}
                />
              </Row>
              <Row>
                <Form.Label>Recipe Image:</Form.Label>
                <Form.Control type="text" ref={imageRef}></Form.Control>
              </Row>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={submitHandler}
              className="mt-2"
            >
              Add recipe
            </Button>
          </Container>
        )}
      </Form>
    </Container>
  );
};

export default AddRecipe;
