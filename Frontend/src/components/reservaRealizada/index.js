import { Link } from "react-router-dom";

const ReservaRealizada = ({ reserva }) => {
  console.log("realizada", reserva);
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
      {reserva.status === null && <p>Status: Pendiente</p>}
      {reserva.status === 1 && <p>Status: Aprobada</p>}
      {reserva.status === 0 && <p>Status: Rechazada</p>}
    </div>
  );
};

export default ReservaRealizada;
