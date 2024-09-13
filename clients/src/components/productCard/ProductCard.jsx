import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.scss';

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-6 col-lg-4 pt-2">
      <Link className="product-card__wrapper" to={`/product/${product._id}`}>
        <div className="product-card__img">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-card__context">
          <div className="product-card__title">
            <p className="mb-1">{product.category.name}</p>
            <h4 className="mb-1">{product.name}</h4>
          </div>
          <div className="product-card__bottom">
            <p>{`$${product.price}`}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
