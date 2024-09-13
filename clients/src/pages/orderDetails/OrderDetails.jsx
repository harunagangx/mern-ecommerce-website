import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrderDetail,
  deleteOrder,
  clearErrors,
} from '../../actions/orderAction';
import { toast } from 'sonner';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import './OrderDetails.scss';

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, order } = useSelector((state) => state.orderDetails);

  const { error: deleteError } = useSelector((state) => state.deleteOrder);

  const handleCancelOrder = () => {
    dispatch(deleteOrder(id));

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    } else {
      toast.success('Order Canceled');
      navigate('/my-orders');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetail(id));
  }, [dispatch, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="orderDetails__wrapper">
            <div className="orderDetailsArea">
              <h3>Order Details</h3>
              <div className="orderDetailsAreaBox">
                <div>
                  <p className="fw-bold">Order Id: #{order._id}</p>
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
                <div className="fw-bold">
                  <p>
                    Order Status:{' '}
                    <span className="fw-normal">{order.orderStatus}</span>
                  </p>
                </div>
              </div>

              <div className="orderDetailItemsArea">
                <h3>Order Items</h3>
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

            <div className="orderDetailsSummaryArea">
              <div className="orderDetailsSummaryAreaBox">
                <h3>Order Summery</h3>
                <div>
                  <div>
                    <p>Subtotal:</p>
                    <span>${order.itemsPrice}</span>
                  </div>
                  <div>
                    <p>Shipping Charges:</p>
                    <span>${order.shippingFee}</span>
                  </div>
                  <div>
                    <p>Tax:</p>
                    <span>${order.taxPrice}</span>
                  </div>
                </div>

                <div className="order-total d-flex justify-content-between">
                  <p>
                    <b>Total:</b>
                  </p>
                  <span>${order.orderTotal}</span>
                </div>

                {order.orderStatus === 'Processing' ? (
                  <button onClick={handleCancelOrder}>Cancel Order</button>
                ) : (
                  <button disabled>Cancel Order</button>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
