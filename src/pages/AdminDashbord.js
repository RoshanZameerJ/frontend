import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', features: '', quantity: '' });
  const [updateProduct, setUpdateProduct] = useState({ id: '', name: '', description: '', price: '', features: '', quantity: '' });
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch products
      // Implement fetch logic here
    };

    const fetchOrders = async () => {
      // Fetch orders
      // Implement fetch logic here
    };

    fetchProducts();
    fetchOrders();
  }, []);

  const handleAddProduct = async () => {
    // Add product logic here
    // Use fetch to call your API endpoint
  };

  const handleUpdateProduct = async () => {
    // Update product logic here
    // Use fetch to call your API endpoint
  };

  const handleDeleteProduct = async (id) => {
    // Delete product logic here
    // Use fetch to call your API endpoint
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <section>
        <h3>Add Product</h3>
        <form onSubmit={handleAddProduct}>
          <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <input type="text" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
          <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          <input type="text" placeholder="Features" value={newProduct.features} onChange={(e) => setNewProduct({ ...newProduct, features: e.target.value })} />
          <input type="number" placeholder="Quantity" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} />
          <button type="submit">Add Product</button>
        </form>
      </section>

      <section>
        <h3>Update Product</h3>
        <form onSubmit={handleUpdateProduct}>
          <input type="text" placeholder="Product ID" value={updateProduct.id} onChange={(e) => setUpdateProduct({ ...updateProduct, id: e.target.value })} />
          <input type="text" placeholder="Name" value={updateProduct.name} onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })} />
          <input type="text" placeholder="Description" value={updateProduct.description} onChange={(e) => setUpdateProduct({ ...updateProduct, description: e.target.value })} />
          <input type="number" placeholder="Price" value={updateProduct.price} onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })} />
          <input type="text" placeholder="Features" value={updateProduct.features} onChange={(e) => setUpdateProduct({ ...updateProduct, features: e.target.value })} />
          <input type="number" placeholder="Quantity" value={updateProduct.quantity} onChange={(e) => setUpdateProduct({ ...updateProduct, quantity: e.target.value })} />
          <button type="submit">Update Product</button>
        </form>
      </section>

      <section>
        <h3>Product List</h3>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} - {product.price}
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>All Orders</h3>
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              {order.userId} - {order.total}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
