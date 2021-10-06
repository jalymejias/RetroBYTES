import React from "react";
import { UserTokenContext } from "../../../../contexts/UserTokenContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import  Avatar  from "@mui/material/Avatar";
import ControlPointIcon from '@mui/icons-material/ControlPoint';



const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    width: 13,
      height: 13,
      borderRadius: '50%',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));



export function MenuTop(props) {
  const [token] = useContext(UserTokenContext);

  return (
    <>
      {token ? (
        <ul>
          <Link to="/newProduct">
            <li className="top_link">
              <span>
              <ControlPointIcon sx={{ fontSize: 40 }} />
 
              </span>
              Crear producto
            </li>
          </Link>
          <Link to="/profile">
            <li className="top_link">
              <span>

            <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        >
        <Avatar alt="" 
        // src={`${process.env.REACT_APP_BACKEND_URL}/${avatar}`}
         />
      </StyledBadge>

            </span>
              Perfil
            </li>
          </Link>
        </ul>
      ) : (
        <></>
      )}
    </>
  );
}
