import React from 'react';
import { useParams } from 'react-router-dom';
import useProduct from '../../hooks/useProduct';
import styled from "styled-components";


const Center = styled.div`
position: absolute;
top: 60%;
left: 50%;
padding: 30px;
transform: translate(-50%, -50%);
width: 600px;
height: 700px;
background: white;
border-radius: 10px;
box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.05);
display: flex;
flex-direction: column;

img{
  height: 400px;

}
.box{
  padding: 0 40px;
  box-sizing: border-box;
}

h1, h2, h3, h4 {
  text-align: left;
  padding: 20px 0;
  border-bottom: 1px solid silver;
}

button {
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
button:hover {
  border-color: #2691d9;
  transition: 0.5s;
}

`;


const Product = () => {
  const {id}=useParams()
  const [product]= useProduct(id)
  console.log({id,product})
  return(
    <Center>
      {
        <div key={product._id}>
            <img src={`${process.env.REACT_APP_BACKEND_URL}/${product.foto}`} alt={`foto de ${product.name}`}/>
            <div className="box">
            
                <h1>{product.name}</h1>
                <h2>Precio: ${product.price}</h2>
                <h2>Año de Fabricación: {product.manufact_date}</h2>
                <h4>Descripcion: {product.description}</h4>
              <button className="cart">RESERVA</button>

            </div>
        </div>
      }
    </Center>
  );
};

export default Product;