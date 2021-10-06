import { Link } from "react-router-dom";
import formatDate from "../../helpers/formatDate";
import { Divider } from "@material-ui/core";
import '../reservaRealizada/style.css'

const ReservaRealizada = ({ reserva }) => {
  return (
  <>
  <Divider />
  <div className="wrapper">
      <div className="reserva_realizada">
        <Link to={`/product/${reserva.product_id}`}>
          <img
            style={{ width: 300, borderRadius: '20px' }}
            src={`${process.env.REACT_APP_BACKEND_URL}/${reserva.photo}`}
            alt={reserva.name} />
        </Link>
      </div>
      <div>
        <h1>{reserva.name}</h1>
        {reserva.status === null && <h2>Status: Pendiente</h2>}
        {reserva.status === 1 && (
          <>
            <h2>Status: Aprobada</h2>
            <h2>Lugar de entrega: {reserva.placeDelivery}</h2>
            <h2>Fecha de entrega: </h2>
            <h1>{formatDate(reserva.timeDelivery)}</h1>
          </>
        )}
        {reserva.status === 0 && <p>Status: Rechazada</p>}
      </div>
      
    </div>
    </>
  );
};

export default ReservaRealizada;
