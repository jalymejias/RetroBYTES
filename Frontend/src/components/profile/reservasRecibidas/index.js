import { Box } from "@mui/system";
import Typography from "@material-ui/core/Typography";
import useReservasRecibidas from "../../../hooks/useReservasRecibidas";
import { useUserTokenContext } from "../../../contexts/UserTokenContext";
import ReservaRecibida from "../../reservaRecibida";

function ReservasRecibidas() {
  const [token] = useUserTokenContext();
  const [reservas] = useReservasRecibidas(token);
  console.log("reservas", reservas);

  return (
    <>
      <Typography
        style={{
          fontSize: "2rem",
          fontWeight: 600,
          textTransform: "uppercase",
          marginBottom:"2rem"
        }}
      >
        Reservas recibidas
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        minWidth="60vh"
        // maxHeight="60vh"   
        sx={{
          "& > :not(style)": { m: 3, width: "80ch" },
          "&": { overflowY: "auto" },
        }}
      >
        {reservas.length &&
          reservas.map((reserva) => (
            <ReservaRecibida key={reserva.idSale} reserva={reserva} />
          ))}
      </Box>
    </>
  );
}

export default ReservasRecibidas;
