import { useState, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useUserTokenContext } from "../../../contexts/UserTokenContext";
import decodeTokenData from "../../../helpers/decodeTokenData";
import useUserProfile from "../../../hooks/useUserProfile";
import EditableAvatar from "../../editarAvatar";

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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    width: 100px;
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
    margin: 0 0 10px 0;
    border: 1px solid;
    background: #2691d9;
    border-radius: 25px;
    font-size: 15px;
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
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [token] = useUserTokenContext();
  const decodedTokenData = decodeTokenData(token);
  const [userProfile] = useUserProfile(token);
  const imageInputRef = useRef(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const userToEdit = new FormData();
    const newAvatar = imageInputRef.current.files[0];
    userToEdit.append("email", email || userProfile.email);
    userToEdit.append("name", name || userProfile.name);

    if (newAvatar) {
      userToEdit.append("avatar", newAvatar);
    }
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${decodedTokenData.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: userToEdit,
      }
    );

    if (res.ok) {
      setDone(true);
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };
  return (
    <>
      {!done ? (
        <Center>
          <h1>Modifica tus datos y preferencias</h1>
          <form onSubmit={handleUpdate}>
            <EditableAvatar
              avatar={userProfile.avatar}
              name={userProfile.name}
              imageInputRef={imageInputRef}
            />
            <div className="txt_field">
              <input
                id="user-fullname"
                name="user-fullname"
                type="text"
                value={name}
                placeholder={userProfile.name}
                onChange={(e) => setName(e.target.value)}
              />
              <span></span>
              <label>Nuevo Nombre</label>
            </div>
            <div className="txt_field">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                placeholder={userProfile.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span></span>
              <label>Nuevo Correo electrónico</label>
            </div>

            <button type="submit" value="Registro">
              ACTUALIZAR
            </button>
          </form>
        </Center>
      ) : (
        alert(
          "Haz actualizado los datos correctamente. Revisa tu correo para validar tu cuenta"
        )
      )}
    </>
  );
};
