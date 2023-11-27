import React, { useEffect, useState } from "react";
import AddRecipe from "./components/AddRecipe";
import RecipeList from "./components/RecipesList";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import HeaderBar from "./components/HeaderBar";
import { course } from "./models/course";

function App() {
  const [addRecipe, setAddRecipe] = useState(false);

  const [courseList, setCourseList] = useState<course[] | undefined>();
  const [searchTerm, setSearchTerm] = useState<string | null | undefined>();
  const [searchCourse, setSearchCourse] = useState<any>();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/foodcategories/`, {
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

      setCourseList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addFullRecipeHandler = ()=>{
    setAddRecipe(false)
    fetchCourses()
  }

  return (
    <>
      <HeaderBar />

      <Container className="selection_container my-4">
        <Row className="mt-3">
          <Col>
            <Form.Select
              onChange={(e) => {
                setSearchCourse(e.target.value);
              }}
            >
              <option value={""}>Search by Course: </option>
              {courseList?.map((item) => (
                <option key={item.c_name} value={item.course_id}>
                  {item.c_name}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col>
            <Form.Control
              placeholder="Search recipe"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchTerm(e.target.value);
              }}
            ></Form.Control>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="mxzz-auto">
            <Button
              onClick={() => {
                setAddRecipe(!addRecipe);
              }}
            >
              Add New Recipe
            </Button>
          </Col>
        </Row>
      </Container>
      {addRecipe && (
        <Container>
          <AddRecipe courseList={courseList} onAddRecipe={addFullRecipeHandler}/>
        </Container>
      )}

      <Container className="mx-5 mx-auto">
        <RecipeList term={searchTerm} courseTerm={searchCourse}></RecipeList>
      </Container>
    </>
  );
}

export default App;
