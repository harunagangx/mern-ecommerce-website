import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, myOrders } from '../../actions/orderAction';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';
import Loader from '../../components/loader/Loader';
import BreadCrumbSection from '../../components/breadCrumbSection/BreadCrumbSection';
import './MyOrders.scss';

const TABLE_HEADS = ['#Order No.', 'Date', 'Total Price', 'Status', ''];

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  const { success } = useSelector((state) => state.deleteOrder);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(myOrders());
  }, [dispatch, error, success]);

  return (
    <Fragment>
      <BreadCrumbSection title="My Orders" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <section>
            <div className="table__container">
              <table>
                <thead>
                  <tr>
                    {TABLE_HEADS.map((th, index) => (
                      <th key={index}>{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((o) => (
                    <tr key={o._id}>
                      <td>{o._id}</td>
                      <td>{o.createdAt}</td>
                      <td>
                        {o.orderTotal.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </td>
                      <td>
                        <span
                          className={`data-status ${o.orderStatus} text-center`}
                        >
                          {o.orderStatus}
                        </span>
                      </td>
                      <td>
                        <button className="view__btn">
                          <Link to={`/order/${o._id}`}>View</Link>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyOrders;
