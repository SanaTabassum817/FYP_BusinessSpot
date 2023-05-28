import React  from "react"
import Admin from "./Admin/Components/Admin";
import CategoriesState from "./Admin/Context/CategoriesState";

function App() { 
  return (
    <>
      <CategoriesState>
      <Admin/>
      </CategoriesState>
    </>
  );
}


export default App;
