import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from '../../actions/orderAction';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { toast } from 'sonner';
import Loader from '../../components/loader/Loader';
import './OrderDetails.scss';

const STATUS_VALUES = ['Processing', 'Delivering', 'Delivered'];

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, order, error } = useSelector((state) => state.orderDetails);

  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState('');

  const handleUpdateOrderStatus = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append('orderStatus', status);

    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success('Update successfully');
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="orderDetails__container">
            <div className="pt-3">
              <IoArrowBack
                onClick={() => navigate(-1)}
                size={35}
                cursor="pointer"
              />
            </div>

            <div className="orderDetailsArea">
              <h3 className="mb-3">Order Details</h3>
              <div className="orderDetailsAreaBox">
                <div>
                  <p className="fw-bold">Order Id: #{order && order._id}</p>
                </div>
                <div>
                  <p className="fw-bold">
                    Name:{' '}
                    <span className="fw-normal">
                      {order.user && order.user.name}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="fw-bold">
                    Phone Number:{' '}
                    <span className="fw-normal">
                      {order.shippingInfo && order.shippingInfo.phoneNum}
                    </span>
                  </p>
                </div>
                <div className="fw-bold">
                  <p>
                    Address:
                    <span className="fw-normal">
                      {order.shippingInfo &&
                        ` ${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.country}`}
                    </span>
                  </p>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <p className="fw-bold mb-1">Order Status:</p>
                  {order.orderStatus !== 'Delivered' ? (
                    <>
                      <select
                        defaultValue={order.orderStatus}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        {STATUS_VALUES.map((i, key) => (
                          <option key={key} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                      <button
                        className="update__btn"
                        onClick={handleUpdateOrderStatus}
                      >
                        Update
                      </button>
                    </>
                  ) : (
                    <>
                      <select
                        onChange={handleUpdateOrderStatus}
                        defaultValue={order.orderStatus}
                        disabled
                      >
                        {STATUS_VALUES.map((i, key) => (
                          <option key={key} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="orderSummaryArea mt-5 mb-5">
              <h3>Order Summary</h3>
              <div className="orderSummaryAreaBox">
                <div className="d-flex justify-content-between">
                  <div>
                    <h5>Subtotal</h5>
                    <p className="text-center">${order.itemsPrice}</p>
                  </div>
                  <div>
                    <h5>Tax</h5>
                    <p className="text-center">${order.taxPrice}</p>
                  </div>
                  <div>
                    <h5>Shipping Fee</h5>
                    <p className="text-center">${order.shippingFee}</p>
                  </div>
                </div>
                <div className="mt-2 d-flex justify-content-between">
                  <h4>Order Total:</h4>
                  <p>${order.orderTotal}</p>
                </div>
              </div>
            </div>

            <div className="orderItemsArea">
              <h3 className="mb-3">Order Items</h3>
              <div className="orderDetailItemsAreaBox">
                {order.orderItems &&
                  order.orderItems.map((item) => (
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
