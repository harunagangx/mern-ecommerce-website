import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../actions/orderAction';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import moment from 'moment';
import Loader from '../../components/loader/Loader';
import './OrderList.scss';

const TABLE_HEADS = [
  'Order ID',
  'Date',
  'Customer Name',
  'Phone Number',
  'Price',
  'Status',
  '',
];

const OrderList = () => {
  const dispatch = useDispatch();

  const { loading, orders, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    dispatch(getOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="order-table__container">
            <div className="table__header">
              <h4 className="header__title">All Orders</h4>
            </div>
            <div className="table__content">
              <table>
                <thead>
                  <tr>
                    {TABLE_HEADS?.map((th, index) => (
                      <th key={index}>{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => {
                    return (
                      <tr key={order._id}>
                        <td colSpan={1}>{order._id}</td>
                        <td>
                          {moment(order.createdAt).format('DD-mm-yyyy HH:mm')}
                        </td>
                        <td>{order.user && order.user.name}</td>
                        <td>
                          {order.shippingInfo && order.shippingInfo.phoneNum}
                        </td>
                        <td>
                          {order.orderTotal.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}
                        </td>
                        <td>
                          <span
                            className={`data-status ${order.orderStatus} text-center`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>
                        <td>
                          <span>
                            <Link to={`/order/${order._id}`}>View</Link>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderList;
