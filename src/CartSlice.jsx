import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      // console.log(action);
      const {name, cost, image} = action.payload;
      const itemExists = state.items.find((item) => item.name === name);
      
      if (itemExists) {
        itemExists.quantity += 1;
      } else {
        const newItem = { name, cost, image, quantity: 1 };
        state.items.push(newItem);

        console.log("Added new item:", newItem);

      }
      //  console.log("Current cart items:", JSON.parse(JSON.stringify(state.items)));

    },

    removeItem: (state, action) => {
      const {name} = action.payload;
      state.items = state.items.filter((item) => item.name !== name);

      console.log("Item removed:", name);
      
      // console.log("Current cart items:", JSON.parse(JSON.stringify(state.items)));
    },

    updateQuantity: (state, action) => {
      const {name, quantity} = action.payload;
      const itemExists = state.items.find((item) => item.name === name);
      if (!itemExists) return
      if (quantity > 0) {
				itemExists.quantity = quantity;
			} else {
				state.items = state.items.filter((item) => item.name !== name);
			}

      console.log("Quantity updated for item:", name);
      
      // console.log("Current cart items:", JSON.parse(JSON.stringify(state.items)));
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
