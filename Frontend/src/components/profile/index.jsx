import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
// import WrappedApp from "./cardProfile";
import { Box } from "@mui/system";
import ReservasRecibidas from "./reservasRecibidas";
import ReservasRealizadas from "./reservasRealizadas";
import Configuracion from "./configuration";
import CerrarSesion from "./sesion";

// import { flexbox } from "@mui/system";

class ProfileTabs extends React.PureComponent {
  state = { activeIndex: 0 };

  handleChange = (_, activeIndex) => this.setState({ activeIndex });
  render() {
    const { activeIndex } = this.state;
    return (
      <>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="5px"
          sx={{
            "& > :not(style)": { m: 3, width: "70ch" },
          }}
        ></Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
          sx={{
            "& > :not(style)": { m: 3, width: "85ch" },
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <VerticalTabs value={activeIndex} onChange={this.handleChange}>
              <MyTab label="Mis Productos" />
              <MyTab label="Reservas realizadas" />
              <MyTab label="Configuración" />
              <MyTab label="Cerrar Sesion" />
            </VerticalTabs>
            {/* Contenedor 1 - Mis Productos */}
            {activeIndex === 0 && (
              <TabContainer>
                Listado de reservas recibidas
                <ReservasRecibidas />
                {/* <WrappedApp /> */}
              </TabContainer>
            )}
            {/* Contenedor 2 - Reservas realizadas */}
            {activeIndex === 1 && (
              <TabContainer>
                Listado de tus reservas
                <ReservasRealizadas />
              </TabContainer>
            )}
            {/* Contenedor 3 - Actualizacion Perfil */}

            {activeIndex === 2 && (
              <TabContainer>
                <Configuracion />
              </TabContainer>
            )}

            {/* Contenedor 4 - Cerrar Sesion */}

            {activeIndex === 3 && (
              <TabContainer>
                <CerrarSesion />
              </TabContainer>
            )}
          </div>
        </Box>
      </>
    );
  }
}

const VerticalTabs = withStyles((theme) => ({
  flexContainer: {
    flexDirection: "column",
  },
  indicator: {
    display: "none",
  },
}))(Tabs);

const MyTab = withStyles((theme) => ({
  root: {
    backgroundColor: "#ccc",
    borderRadius: theme.shape.borderRadius,
    fontSize: "2rem",
  },
  wrapper: {
    backgroundColor: "#ddd",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
  selected: {
    color: "tomato",
    borderBottom: "2px solid tomato",
  },
}))(Tab);

function TabContainer(props) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="45vh"
      minWidth="60vh"
      backgroundColor="lightgray"
      sx={{
        "& > :not(style)": { m: 3, width: "80ch" },
      }}
    >
      <Typography component="div" style={{ font: "2rem", padding: 24 }}>
        {props.children}
      </Typography>
    </Box>
  );
}

export default ProfileTabs;
