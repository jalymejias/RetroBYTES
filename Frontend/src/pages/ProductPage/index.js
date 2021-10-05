import React from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import styled from "styled-components";
import background from "../../assets/images/backIcons.jpg";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { Rating } from "@mui/material";

// const Back = styled.div`
//     backgroundImage: "url(${background})";
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     height: 50vh;
//     width: 100vw;
// `

const Center = styled.div`
  display: table;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 45vw;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px #ccc;
  flex-direction: column;

  img {
    height: 30vw;
    border-radius: 5%;
    display: block;
    margin: 0 auto;
    margin-top: 20px;
  }
  .box {
    padding: 0 50px;
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4 {
    text-align: left;
    padding: 15px 0;
    border-bottom: 1px solid silver;
  }

  button {
    width: 60vw;
    display: block;
    margin: 0 auto;
    height: 50px;
    margin-top: 1em;
    margin-bottom: 1em;
    border: 1px solid;
    background: #2691d9;
    border-radius: 25px;
    font-size: 18px;
    text-align: center;
    color: #e9f4fb;
    font-weight: 700;
    cursor: pointer;
    outline: none;
  }
  button:hover {
    border-color: #2691d9;
    transition: 0.5s;
  }
`;

const Product = () => {
  const { id } = useParams();
  const [product] = useProduct(id);
  const [token] = useUserTokenContext();

  console.log(product);

  const reservarProducto = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/buy/${id}/proposal`,
      {
        method: "POST",
        headers: { Authorization: token },
      }
    );

    if (res.ok) {
      alert("Reserva realizada correctamente");
    } else {
      const error = await res.json();
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        width: "100vw",
        height: "100vh",
      }}
    >
      <Center>
        {Object.values(product).length && (
          <div key={product.id}>
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/${product.foto}`}
              alt={`foto de ${product.name}`}
            />
            <div className="box">
              <Rating value={+product.votes} readOnly />
              <h1>{product.name}</h1>
              <h2>Precio: €{product.price}</h2>
              <h2>Año de fabricación: {product.manufact_date}</h2>
              <h4>{product.description}</h4>
              <button className="cart" onClick={reservarProducto}>
                RESERVA
              </button>
            </div>
          </div>
        )}
      </Center>
    </div>
  );
};

export default Product;
