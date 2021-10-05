import { useState, useEffect } from "react";

const useProductsByCategory = (category) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/search?search=${category}`
      );

      if (res.ok) {
        const body = await res.json();
        setProducts(body.data);
      }
    };

    fetchProducts();
  }, [category]);

  return [products, setProducts];
};

export default useProductsByCategory;
