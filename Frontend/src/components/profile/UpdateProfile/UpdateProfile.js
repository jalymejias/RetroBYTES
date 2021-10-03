import { useState } from "react";
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

form .txt_field {
 position: relative;
 border-bottom: 2px solid #adadad;
 margin: 30px 0;
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
.txt_field label {
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition: 0.5s;
}
.txt_field span::before {
  content: "";
  position: absolute;
  top: 40px;
  left: 0;
  width: 0%;
  height: 2px;
  background: #2691d9;
  transition: 0.5s;
}
.txt_field input:focus ~ label,
.txt_field input:valid ~ label {
  top: -5px;
  color: #2691d9;
}
.txt_field input:focus ~ span::before,
.txt_field input:valid ~ span::before {
  width: 100%;
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
button[type="submit"] {
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
button[type="submit"]:hover {
  border-color: #2691d9;
  transition: 0.5s;
}
.signup_link {
  margin: 30px 0;
  text-align: center;
  font-size: 16px;
  color: #666666;
}
.signup_link input {
  width: 100%;
  height: 50px;
  border: 1px solid;
  background: #2691d9;
  border-radius: 25px;
  font-size: 18px;
  color: #e9f4fb;
  font-weight: 700;
  cursor: pointer;
  outline: none;
}
.signup_link input:hover {
  text-decoration: underline;
}
`;

export const UpdateProfile = (props) => {

  const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const handleUpdate = async (e) => {
    e.preventDefault();
    const requestBody = {
        name,
        userName,
        email,
        password,
        repeatPassword,
      };
      const res = await fetch("", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
    };
  return (
    <>
      <Center>
          <h1>Modifica tus datos y preferencias</h1>
          <form onSubmit={handleUpdate}>
            <div class="txt_field">
              <input
                id="user-fullname"
                name="user-fullname"
                required="required"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <span></span>
                <label>Nuevo Nombre</label>
            </div>
              <div class="txt_field">
              <input
                id="username"
                name="username"
                required="required"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                />
                <span></span>
                <label>Nuevo Nombre de usuario</label>
              </div>
              <div class="txt_field">
              <input
                id="email"
                name="email"
                required="required"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <span></span>
                <label>Nuevo Correo electrónico</label>
              </div>
              <div class="txt_field">
              <input
                id="password"
                name="password"
                required="required"
                type="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <span></span>
                <label>Nueva Contraseña</label>
              </div>
              <div class="txt_field">
              <input
                id="confirm-password"
                name="confirm-password"
                required="required"
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <span></span>
              <label htmlFor="user-confirm-password">
                Confirma tu Nueva contraseña
              </label>
              </div>
            <button type="submit" value="Registro">
              ACTUALIZAR
            </button>
          </form>
         </Center>
    </>
  );
};