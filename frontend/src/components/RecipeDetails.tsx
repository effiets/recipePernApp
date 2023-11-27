import { Modal, Row} from "react-bootstrap";

const RecipeDetails: React.FC<{
  recipeIngredients: [
    { name: string; ingredient_quantity: number; measurement: string } 
  ] | undefined;
  recipeName: string;
  recipeInstructions: string;
  show: boolean;
  showHandler: () => void;
}> = (props) => {
  return (
    <Modal show={props.show} size="lg" onHide={props.showHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{props.recipeName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Ingredients List</h5>
        <ul>
          {props.recipeIngredients?.map((item) => (
            <li key={item.name}>
              {item.name} - {item.ingredient_quantity}  {item.measurement}
            </li>
          ))}
        </ul>
       
        <Row>
          <h5>Instructions</h5>
        </Row>
        <Row className="m-2">{props.recipeInstructions}</Row>
       
      </Modal.Body>
    </Modal>
  );
};

export default RecipeDetails;
