import { Box } from "@mui/system";
import { UpdateProfile } from "../UpdateProfile/UpdateProfile";

function Configuracion() {
  return (
    <>
      <Box
        display="flex"
        minHeight="50vh"
        minWidth="60vh"
        sx={{
          "& > :not(style)": { m: 3, width: "80ch" },
        }}
      >
        <UpdateProfile></UpdateProfile>

      </Box>
    </>
  );
}

export default Configuracion;