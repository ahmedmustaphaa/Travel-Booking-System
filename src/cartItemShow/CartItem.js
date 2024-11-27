import React from 'react';
import { Card, Stack, Button } from 'react-bootstrap';
import { api } from '../api'; // Assuming the api contains product details
import { useShareData } from '../ContextApi'; // Assuming context has cart data and actions
import Swal from 'sweetalert2';

function Cartproduct({ id }) {
    const getItem = api.find((item) => item.id === id); // Find the item by id from API data
    const { getItemQuantity, increaseQuantity, decreaseQuantity, removeItem, CartItems } = useShareData(); // Extract functions from context

    const quantity = getItemQuantity(id); // Get quantity of the current item from the context
    const totalPrice = getItem.price * quantity; // Calculate price for the current item

    // Function to handle item removal with confirmation
    const handleRemoveItem = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This item will be removed from your cart.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                removeItem(id); // Call the removeItem function from context
                Swal.fire(
                    'Removed!',
                    'The item has been removed from your cart.',
                    'success'
                );
            }
        });
    };

    // Calculate total price of all items in the cart using reduce
    const calculateTotalPrice = () => {
        return CartItems.reduce((total, item) => {
            const product = api.find(p => p.id === item.id); // Find the product details from API
            if (product) {
                // Add the price * quantity of the current item to the total
                total += product.price * getItemQuantity(item.id);
            }
            return total;
        }, 0); // Start with 0 and accumulate the total
    };

    return (
        <div>
            <Card className="mb-3 shadow-sm">
                <Card.Body>
                    <Stack direction="horizontal" gap={3}>
                        <img 
                            src={getItem.img} 
                            alt={getItem.title} 
                            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} 
                        />
                        <div className="me-auto">
                            <Card.Title>{getItem.title}</Card.Title>
                            <Card.Text className="text-muted">Price: ${totalPrice}</Card.Text> {/* Display total price for this item */}
                        </div>
                        <div className="d-flex align-items-center">
                            <Button style={{backgroundColor:'green'}} onClick={() => increaseQuantity(id)}>+</Button>
                            <h5 className="mx-2">{quantity}</h5> {/* Display quantity for the current item */}
                            <Button  style={{backgroundColor:'red'}} onClick={() => decreaseQuantity(id)}>−</Button>
                        </div>
                    </Stack>
                    <Button  style={{ backgroundColor: 'red',width:'70%',outline:'none',border:'none',marginTop:'8px' }} className="ms-3 remove" onClick={handleRemoveItem}>
                        Remove
                    </Button>
                </Card.Body>
            </Card>

            {/* Display total price of all items in the cart */}
          
        </div>
    );
}

export default Cartproduct;
