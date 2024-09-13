import React from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import { addItemToCart, removeItemFromCart } from '../../actions/cartAction';
import { useDispatch } from 'react-redux';

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const increaseQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1;

    if (newQuantity >= stock) return;

    dispatch(addItemToCart(id, newQuantity));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQuantity = quantity - 1;

    if (newQuantity < 1) return;

    dispatch(addItemToCart(id, newQuantity));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <tr key={item.product}>
      <td>
        <img src={item.image} alt="" />
        <span>{item.name}</span>
      </td>
      <td>${item.price}</td>
      <td>
        <button onClick={() => decreaseQuantity(item.product, item.quantity)}>
          -
        </button>
        <input type="number" value={item.quantity} readOnly />
        <button
          onClick={() =>
            increaseQuantity(item.product, item.quantity, item.stock)
          }
        >
          +
        </button>
      </td>
      <td>${item.price * item.quantity}</td>
      <td>
        <span role="button" onClick={() => handleRemoveFromCart(item.product)}>
          <CiCircleRemove size={35} />
        </span>
      </td>
    </tr>
  );
};

export default CartItemCard;
