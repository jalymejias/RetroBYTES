//import { useContext } from "react";
//import { TokenContext } from "./TokenContext";
//import { Redirect } from "react-router-dom";
import styled from "styled-components";


const Center = styled.div`
top: 50%;
left: 50%;
width: 400px;
background: white;
border-radius: 10px;
box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.05);

h1 {
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid silver;
}
form {
  padding: 0 40px;
  box-sizing: border-box;
}

.txt_field input {
 width: 100%;
 padding: 0 5px;
 height: 40px;
 font-size: 16px;
 border: none;
 background: none;
 outline: none;
}

input[type="submit"] {
  width: 100%;
  height: 50px;
  margin: 0 0 10px 0;
  border: 1px solid;
  background: #2691d9;
  border-radius: 25px;
  font-size: 18px;
  color: #e9f4fb;
  font-weight: 700;
  cursor: pointer;
  outline: none;
}
input[type="submit"]:hover {
  border-color: #2691d9;
  transition: 0.5s;
}

`;


export const Logout = (props) => {
//  const [token, setToken] = useContext(TokenContext);
  const handleLogout = (e) => {
    e.preventDefault();
  //  setToken("");
  };
  return (
    <>
      <Center>
        <h1>¿Desea Cerrar su Sesion?</h1>
          <form onSubmit={handleLogout}>
            <input
              type="submit"
              value="Logout"
              className="button-all-page"
            ></input>
          </form>
      </Center>
      
    </>
  );
};