import { useState, useEffect } from "react";


const useReservasRealizadas = (token) => {
  const [reservas, setReservas] = useState([]);

  

  useEffect(() => {
    if (token) {
      const fetchReservasRealizadas = async () => {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/userBuyer/bookings`,
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

      fetchReservasRealizadas();
    }
  }, [token]);

  return [reservas, setReservas];
};

export default useReservasRealizadas;
