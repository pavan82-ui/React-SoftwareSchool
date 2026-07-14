import { useCart } from './CartContext';

const products = [
  { id: 1, name: 'Apple', price: 1.00 },
  { id: 2, name: 'Banana', price: 0.50 },
  { id: 3, name: 'Orange', price: 0.75 },
  { id: 4, name: 'Grapes', price: 2.00 },
];

function ProductList() {
  const { addItem } = useCart();

  return (
    <div className="product-list">
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <div>
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <button onClick={() => addItem(product)}>Add to Cart</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;