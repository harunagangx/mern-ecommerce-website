import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getProductDetails,
  deleteProduct,
  clearErrors,
} from '../../actions/productAction';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstant';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Loader from '../../components/loader/Loader';
import './ProductDetails.scss';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const handleDeleteProduct = () => {
    if (window.confirm('Do you you want to delete this product')) {
      dispatch(deleteProduct(id));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors);
    }

    if (isDeleted) {
      toast.success('Delete Product Successfully');
      navigate(-1);
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, error, id, isDeleted, deleteError, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="productDetails__container">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <img src={product.image} alt="" />
              </div>
            </div>

            <div>
              <div className="productDetails__context mt-3">
                <div className="detailsBlock-1">
                  <h1>{product.name}</h1>
                  <p className="fw-bold">
                    Product code:{' '}
                    <span className="fw-normal">#{product._id}</span>
                  </p>

                  <p className="fw-bold">
                    Stock: <span className="fw-normal">{product.stock}</span>
                  </p>
                </div>
                <div className="detailBlock-2">
                  <div className="detailBlock-2-1">
                    <div className="detailBlock-2-1-2">
                      <p className="fw-bold">
                        Price:{' '}
                        <span className="fw-normal">${product.price}</span>
                      </p>

                      <p className="fst-italic fw-bold">
                        {' '}
                        Description:{' '}
                        <span className="fw-normal">{product.description}</span>
                      </p>
                    </div>
                  </div>
                  <div className="detailBlock-3 text-center mt-4">
                    <button onClick={handleDeleteProduct}>
                      Delete Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetails;
