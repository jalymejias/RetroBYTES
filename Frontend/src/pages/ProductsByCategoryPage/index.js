import { useParams } from "react-router-dom";
import useProductsByCategory from "../../hooks/useProductsByCategory";
import ListProducts from "../../components/products/products";
import Footer from "../../components/commons/footer";

const ProductsByCategoryPage = () => {
  const { category } = useParams();
  const [products] = useProductsByCategory(category);
  return (
    <>
      {products.length ? (
        <ListProducts products={products} />
      ) : (
        "No hay productos en esta categoría"
      )}
      <Footer />
    </>
  );
};

export default ProductsByCategoryPage;
