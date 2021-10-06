import { useParams } from "react-router-dom";
import useProductsByCategory from "../../hooks/useProductsByCategory";
import ListProducts from "../../components/products/products";
import Footer from "../../components/commons/footer";
import CategoryPageError from "../../components/commons/categoryPageError";

const ProductsByCategoryPage = () => {
  const { category } = useParams();
  const [products] = useProductsByCategory(category);
  return (
    <>
      {products.length ? (
        <ListProducts products={products} />
      ) : (
        <div>
          <CategoryPageError />
        </div>
      )}
      <Footer />
    </>
  );
};

export default ProductsByCategoryPage;
