import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { Divider} from "@material-ui/core";
import Input from '@mui/material/Input'


const ReservaRecibida = ({ reserva }) => {
  const [token] = useUserTokenContext();
  const [status, setStatus] = useState(reserva.status);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [deliveryPlace, setDeliveryPlace] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  console.log("reserva", reserva);

  const aprobarReserva = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/reserve/${reserva.product_id}/${reserva.idSale}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({
          placeDelivery: deliveryPlace,
          timeDelivery: deliveryTime,
        }),
      }
    );
    if (res.ok) {
      setStatus(1);
      setShowDeliveryForm(false);
    } else {
      const error = await res.json();
      alert(error.message);
    }
  };

  const rechazarReserva = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/reject/${reserva.idSale}`,
      { method: "PUT", headers: { Authorization: token } }
    );
    if (res.ok) {
      setStatus(0);
    } else {
      const error = await res.json();
      alert(error.message);
    }
  };

  return (
    <><Divider /><div className="wrapper">
      <div className="reserva_realizada">
        <Link to={`/product/${reserva.product_id}`}>
          <img
            style={{ width: 300, borderRadius: "20px" }}
            src={`${process.env.REACT_APP_BACKEND_URL}/${reserva.photo}`}
            alt={reserva.name} />
        </Link>
      </div>
      <div>
        <h1>{reserva.name}</h1>
        {status === null && <h2>Status: Pendiente</h2>}
        {status === 1 && <h2>Status: Aprobada</h2>}
        {status === 0 && <h2>Status: Rechazada</h2>}

        {status === null && !showDeliveryForm && (
          <div>
            <button onClick={() => setShowDeliveryForm(true)}>Aprobar</button>
            <button onClick={rechazarReserva}>Rechazar</button>
          </div>
        )}
        {showDeliveryForm && (
          <form onSubmit={aprobarReserva}>
            <Input sx={{ minWidth: 300, fontsize: 34}}                                                                                        
              value={deliveryPlace}
              onChange={(e) => setDeliveryPlace(e.target.value)}
              placeholder="Lugar de entrega" />
            <Input
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              placeholder="Fecha de entrega"
              type="datetime-local" />
            <button onClick={() => setShowDeliveryForm(false)}>Cancelar</button>
           
            <button type="submit">Confirmar</button>
          </form>
        )}
      </div>
    </div></>
  );
};

export default ReservaRecibida;
