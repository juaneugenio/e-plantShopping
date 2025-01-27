/** @format */

import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./cartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
	const cart = useSelector((state) => state.cart.items);
	console.log(cart);

	const dispatch = useDispatch();

	// Calculate total amount for all products in the cart
	const calculateTotalAmount = () => {
		// Empty cart validation
		if (cart.length === 0) return "0.00";

		const totalAmount = cart
			.reduce((total, item) => {
				const itemCost = parseFloat(item.cost.replace("$", ""));
				return total + itemCost * item.quantity;
			}, 0)
			.toFixed(2);

		return totalAmount;
	};

	const handleContinueShopping = (e) => {
		console.log("Clicked on Continue Shopping:", e.target.textContent);
		onContinueShopping(e);
	};

	const handleIncrement = (item) => {
		dispatch(
			updateQuantity({
				...item,
				quantity: item.quantity + 1,
			}),
		);
	};

	const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item))
    }else{
      dispatch(updateQuantity({
        ...item,
        quantity: item.quantity - 1,
      }))
    }
  };

	const handleRemove = (item) => {
		dispatch(removeItem(item));
	};

	// Calculate total cost based on quantity for an item
	const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.replace("$", ""));
    // Display the initial cost for the item
    if(item.quantity === 1){
      return itemCost.toFixed(2);
    }
    return (itemCost * item.quantity).toFixed(2);
  };

	return (
		<div className="cart-container">
			<h2 style={{ color: "black" }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
			<div>
				{cart.map((item) => (
					<div className="cart-item" key={item.name}>
						<img className="cart-item-image" src={item.image} alt={item.name} />
						<div className="cart-item-details">
							<div className="cart-item-name">{item.name}</div>
							<div className="cart-item-cost"><span>PPU: </span>{item.cost}</div>
							<div className="cart-item-quantity">
								<button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>
									-
								</button>
								<span className="cart-item-quantity-value">{item.quantity}</span>
								<button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>
									+
								</button>
							</div>
							<div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
							<button className="cart-item-delete" onClick={() => handleRemove(item)}>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
			<div style={{ marginTop: "20px", color: "black" }} className="total_cart_amount"></div>
			<div className="continue_shopping_btn">
				<button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>
					Continue Shopping
				</button>
				<br />
				<button className="get-started-button1">Checkout</button>
			</div>
		</div>
	);
};

export default CartItem;
