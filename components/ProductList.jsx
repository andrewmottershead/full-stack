// import { useUser } from "@auth0/nextjs-auth0/client";
import { useProducts } from "@/lib/tq/products/queries";
// import { useAddToBasket } from "@/lib/tq/baskets/mutations";
import { List, ListItem } from "@/components/mui";
import Product from "@/components/Product";

const ProductList = ({
  deleteHandler = () => {},
  headingLevel = 2 }) => {
  const { data: products } = useProducts();
  return (
    <List
      component="ol"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(400px,1fr))",
      }}
    >
      {products.map((product) => (
        <ListItem key={product._id} component="li">
          <Product
            product={product}
            deleteHandler={deleteHandler}
            headingLevel={headingLevel}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ProductList;