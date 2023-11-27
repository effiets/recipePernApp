import { useEffect, useRef, useState } from "react";
import { ingredient } from "../models/ingredient";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";

import './AddIngredients.css'

const AddIngredient: React.FC<{
  id: number | null;
  onAddInstructions: () => void;
}> = (props) => {
  const ingredientRef = useRef<HTMLInputElement>(null);
  const unitsRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement | any>(null);
  const [ingredintAdded, setIngredientAdded] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [ingredientList, setIngredientList] = useState<ingredient[]>();
  const [ingrName, setIngrName] = useState<string | null>(null);
  const [ingredientsForRecipe, setIngredientsForRecipe] = useState<any[]>([]);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/ingredients/`, {
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

      setIngredientList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createIngredient = async () => {
    const newIngr = ingredientRef.current!.value;

    try {
      const response = await fetch(`http://127.0.0.1:3000/ingredients/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: newIngr,
        }),
      });
      if (!response.ok) {
        throw new Error(`Something went wrong... \n ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
    }

    setShowModal(false);
    fetchIngredients();
  };

  const addQuantityHandler = async ()=> {
    const newQuantity = {
      recipe_id: props.id,
      ingredient_id: ingredintAdded,
      measurement: unitsRef.current?.value,
      ingredient_quantity: amountRef.current?.value,
    };

    try {
      const response = await fetch(`http://127.0.0.1:3000/quantities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newQuantity),
      });
      const data = await response.json();

      setIngredientsForRecipe((prev) => [
        ...(prev as any[]),
        {
          name: ingrName,
          measurement: data.measurement,
          ingredient_quantity: data.ingredient_quantity,
        },
      ]);

      if (!response.ok) {
        throw new Error(`Something went wrong... \n ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const deleteQuantityHandler = async (ingreedientId:number) => {

  //   console.log("check...")
  //   const deletedQuantity = {
  //     recipe_id: props.id,
  //     ingredient_id: ingreedientId,
  //   };

  //   console.log(deletedQuantity);

  //   try {
  //     const response = await fetch(`http://127.0.0.1:3000/quantities`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       body: JSON.stringify(deletedQuantity),
  //     });
    

   

  //     setIngredientsForRecipe((prev) => {
  //       return prev.filter((temp) => temp.id === ingreedientId);
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Something went wrong... \n ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="mt-4">
      <Row  className="d-flex flex-column flex-md-row">
        <Col className="ingredients_container">
          <Form.Select
            aria-label="Select Ingredient"
            onChange={(e) => {
              setIngredientAdded(e.target.value);
              setIngrName(e.target.selectedOptions[0].text);
            }}
          >
            <option value={""}>Select ingredients</option>
            {ingredientList?.map((i) => (
              <option key={i.ingredient_id} value={i.ingredient_id}>
                {i.name}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col className="ingredients_container">
          {" "}
          <Form.Control type="text" placeholder="Units" ref={unitsRef} />
        </Col>
        <Col className="ingredients_container">
          {" "}
          <Form.Control
            type="number"
            min="0"
            placeholder="Amount"
            ref={amountRef}
          />
        </Col>
        <Col className="ingredients_container">
          {" "}
          <Button onClick={addQuantityHandler}>Add</Button>
        </Col>
      </Row>
      <Row>
        <Form.Text>
          Not in the list? Click to add new Ingredient{" "}
          <span
            onClick={() => setShowModal(true)}
            className="text-decoration-underline fw-bold"
          >
            Here
          </span>
        </Form.Text>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Insert New Ingredient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Ingredient Name"
                autoFocus
                ref={ingredientRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createIngredient}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <ul>
          {ingredientsForRecipe.map((ing) => (
            <div key={ing.name} className="d-block p-2">
              <li>
                {ing.name} - {ing.ingredient_quantity} {ing.measurement}
              </li>
            </div>
          ))}
        </ul>
      </div>
      <Button onClick={props.onAddInstructions}>Next step</Button>
    </div>
  );
};

export default AddIngredient;
