import { useState, useEffect } from "react";

const useReservasRecibidas = (token) => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    if (token) {
      const fetchReservasRecibidas = async () => {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/userSeller/bookings`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (res.ok) {
          const body = await res.json();
          setReservas(body.data);
        }
      };

      fetchReservasRecibidas();
    }
  }, [token]);

  return [reservas, setReservas];
};

export default useReservasRecibidas;
