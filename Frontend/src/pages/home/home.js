import { UserTokenContext } from "../../contexts/UserTokenContext";
import { useContext } from "react";
import Slides from "../../components/commons/main_slider";
import Footer from "../../components/commons/footer";
import ListProducts from "../../components/products/products";
import useProducts from "../../hooks/useProducts";

function Home() {
  const [token] = useContext(UserTokenContext);
  const [products] = useProducts();

  return (
    <>
      {token ? (
        <>
          <Slides />
          <ListProducts products={products} />
          <Footer />
        </>
      ) : (
        <>
          <Slides />
          <ListProducts products={products} />
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
