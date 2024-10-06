import React, { Fragment } from 'react';
import BreadCrumbSection from '../../components/breadCrumbSection/BreadCrumbSection';
import emptyImg from '../../assets/empty-cart.png';
import CartItemCard from '../../components/cartItemCard/CartItemCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Cart.scss';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Fragment>
      <BreadCrumbSection title="Cart" />
      {cartItems.length === 0 ? (
        <div className="empty-cart-img pb-5">
          <img src={emptyImg} alt="" />
          <h4 className="text-center">
            There are no products in your shopping cart.
            <Link to="/shop">Go to Shop</Link>
          </h4>
        </div>
      ) : (
        <Fragment>
          <section className="cart__section ">
            <div className="container">
              <div className="row">
                <div className="col-9">
                  <div className="cart__container">
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Subtotal</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems &&
                          cartItems.map((item) => (
                            <CartItemCard item={item} key={item.product} />
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-3">
                  <div className="cart-summary__container">
                    <div className="summary__header">
                      <p className="m-0">Order Summary</p>
                    </div>
                    <div className="summary__body">
                      <div className="d-flex justify-content-between">
                        <p>Subtotal</p>
                        <p>{`$${cartItems.reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )}`}</p>
                      </div>

                      <div className="d-flex align-items-center justify-content-between">
                        <p>Total</p>
                        <p>
                          {`$${cartItems.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          )}`}
                        </p>
                      </div>
                      <div className="checkOut-btn text-center">
                        <button>
                          <Link to="/shipping">Proceed To Checkout</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
