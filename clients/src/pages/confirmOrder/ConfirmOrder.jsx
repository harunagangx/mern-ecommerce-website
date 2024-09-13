import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../actions/orderAction';
import { clearCartItems } from '../../actions/cartAction';
import Loader from '../../components/loader/Loader';
import './ConfirmOrder.scss';
import { toast } from 'sonner';

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { loading, user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingFee = subtotal > 7000 ? 0 : 100;

  const tax = subtotal * 0.18;

  const orderTotal = subtotal + tax + shippingFee;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`;

  const placeOrderHandler = () => {
    const orderData = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: subtotal,
      taxPrice: tax,
      shippingFee: shippingFee,
      orderTotal: orderTotal,
    };

    dispatch(createOrder(orderData));
    dispatch(clearCartItems());
    navigate('/my-orders');
    toast.success('place order successfully');

    // const data = {
    //   subtotal,
    //   shippingFee,
    //   tax,
    //   totalPrice,
    // };

    // sessionStorage.setItem('orderInfo', JSON.stringify(data));

    // navigate('/process/payment');
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="confirm-order__wrapper">
            <div className="confirmShippingArea">
              <h3>Shipping Details</h3>
              <div className="confirmShippingAreaBox">
                <div>
                  <p className="fw-bold">
                    Name: <span className="fw-normal">{user.name}</span>
                  </p>
                </div>
                <div>
                  <p className="fw-bold">
                    Phone Number:
                    <span className="fw-normal">{shippingInfo.phoneNum}</span>
                  </p>
                </div>
                <div className="fw-bold">
                  <p>
                    Address: <span className="fw-normal">{address}</span>
                  </p>
                </div>
              </div>

              <div className="confirmCartItems">
                <h3>Your Cart Items</h3>
                <div className="confirmCartItemsContainer">
                  {cartItems &&
                    cartItems.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <h4>{item.name}</h4>
                        <span className="pe-3">
                          ${item.price} X {item.quantity} ={' '}
                          <b>${item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="orderSummaryArea">
              <div className="orderSummaryBox">
                <h3>Order Summery</h3>
                <div>
                  <div>
                    <p>Subtotal:</p>
                    <span>
                      {subtotal.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                  </div>
                  <div>
                    <p>Shipping Charges:</p>
                    <span>
                      {shippingFee.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                  </div>
                  <div>
                    <p>Tax:</p>
                    <span>
                      {tax.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                  </div>
                </div>

                <div className="order-total d-flex justify-content-between">
                  <p>
                    <b>Total:</b>
                  </p>
                  <span>
                    {orderTotal.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </span>
                </div>

                <button onClick={placeOrderHandler}>Place Order</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ConfirmOrder;
