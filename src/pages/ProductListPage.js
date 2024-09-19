import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import '../style/Product.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1.0/shopping/all')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setQuantity(1); // Reset quantity when selecting a new product
  };

  const handleOrder = () => {
    if (!selectedProduct) {
      console.log('No product selected');
      return;
    }

    const order = {
      productId: selectedProduct._id,
      quantity,
      userId: 'user-id-placeholder', // Replace with actual user ID
    };

    // Retrieve token from local storage
    const token = localStorage.getItem('authToken'); // Adjust based on where you store your token

    if (!token) {
      console.log('No token found in local storage');
      return;
    }

    axios.post('http://localhost:5000/api/v1.0/shopping/place', order, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        alert('Order placed successfully!');
        setSelectedProduct(null); // Deselect the product
      })
      .catch(error => {
        console.error('Error placing order:', error.response?.data || error.message);
        alert('Failed to place order. Please check your authentication and try again.');
      });
  };

  return (
    <Container>
      <Form.Control
        type="text"
        placeholder="Search for products"
        value={search}
        onChange={handleSearchChange}
        className="my-4"
      />
      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Col md={4} key={product._id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>
                    Price: ${product.price} | Quantity: {product.quantity}
                  </Card.Text>
                  <div>
                    <strong>Features:</strong>
                    <ul>
                      {product.features && product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedProduct && selectedProduct._id === product._id ? (
                    <div>
                      <Form.Group controlId={`formQuantity_${product._id}`}>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))} // Ensure value is a number
                          min="1"
                        />
                      </Form.Group>
                      <Button 
                      className ="my-button"
                        variant="success" 
                        onClick={handleOrder}
                      >
                        Order Now
                      </Button>
                      <Button 
                      className ="my-button"
                        variant="secondary" 
                        onClick={() => setSelectedProduct(null)} // Deselect the product
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="primary" 
                      onClick={() => handleSelectProduct(product)}
                    >
                      Select
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No product found</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ProductList;
