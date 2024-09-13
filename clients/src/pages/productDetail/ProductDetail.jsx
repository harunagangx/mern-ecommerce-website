import React, { Fragment, useEffect, useState } from 'react';
import BreadCrumbSection from '../../components/breadCrumbSection/BreadCrumbSection';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail, clearErrors } from '../../actions/productAction';
import { addItemToCart } from '../../actions/cartAction';
import Loader from '../../components/loader/Loader';
import './ProductDetail.scss';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity >= product.stock) return;

    const qty = quantity + 1;

    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (quantity <= 1) return;

    const qty = quantity - 1;

    setQuantity(qty);
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart(id, quantity));
    toast.success('added to cart');
  };

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors());
    }
    dispatch(getProductDetail(id));
  }, [dispatch, id, error]);

  return (
    <Fragment>
      <BreadCrumbSection title="Product Details" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <section className="details__section">
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="col-6">
                  <div className="product__details">
                    <div className="detailsBlock-1">
                      <h2>{product.name}</h2>
                      <p>Product code: {product._id}</p>
                      <p className="fst-italic">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequuntur iure quas illo voluptates labore tempore!
                      </p>
                    </div>
                    <div className="detailBlock-2">
                      <h3>{`$${product.price}`}</h3>
                      <div className="detailBlock-2-1 d-flex align-items-center gap-4 mt-3">
                        <div className="detailBlock-2-1-1">
                          <button onClick={decreaseQuantity}>
                            <FiMinus size={16} />
                          </button>
                          <input type="number" readOnly value={quantity} />
                          <button onClick={increaseQuantity}>
                            <FiPlus size={16} />
                          </button>
                        </div>
                        <div className="detailBlock-2-1-2">
                          <p className="m-0">Stock: {product.stock}</p>
                        </div>
                      </div>
                      <div className="detailBlock-3 mt-4">
                        <button onClick={handleAddToCart}>Add to Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="description__section">
            <div className="container">
              <h1>Description</h1>
              <p>{product.description}</p>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetail;
