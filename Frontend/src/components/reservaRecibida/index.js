import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserTokenContext } from "../../contexts/UserTokenContext";

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
    <div className="reserva_realizada">
      <Link to={`/product/${reserva.product_id}`}>
        <img
          style={{ width: 200, height: 200 }}
          src={`${process.env.REACT_APP_BACKEND_URL}/${reserva.photo}`}
          alt={reserva.name}
        />
      </Link>
      <p>{reserva.name}</p>
      {status === null && <p>Status: Pendiente</p>}
      {status === 1 && <p>Status: Aprobada</p>}
      {status === 0 && <p>Status: Rechazada</p>}
      {status === null && !showDeliveryForm && (
        <div>
          <button onClick={() => setShowDeliveryForm(true)}>Aprobar</button>
          <button onClick={rechazarReserva}>Rechazar</button>
        </div>
      )}
      {showDeliveryForm && (
        <form onSubmit={aprobarReserva}>
          <input
            value={deliveryPlace}
            onChange={(e) => setDeliveryPlace(e.target.value)}
            placeholder="Lugar de entrega"
          />
          <input
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            placeholder="Fecha de entrega"
          />
          <button onClick={() => setShowDeliveryForm(false)}>Cancelar</button>
          <button type="submit">Confirmar</button>
        </form>
      )}
    </div>
  );
};

export default ReservaRecibida;
