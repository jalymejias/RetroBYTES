import { Box } from "@mui/system";
import { Logout } from "../logOut/logout";

function Sesion() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        minWidth="60vh"
        sx={{
          "& > :not(style)": { m: 3, width: "80ch" },
        }}
      >
        <Logout/>
      </Box>
    </>
  );
}

export default Sesion;