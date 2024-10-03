import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './ProductCard.scss';

const ProductCard = ({ item }) => {
  return (
    <Link
      className="card__wrapper mb-4 overflow-hidden"
      to={`/product/${item._id}`}
    >
      <div className="d-flex">
        <img src={item.image} alt="" srcset="" />

        <div className="p-4 d-flex flex-column justify-content-around">
          <div className="d-flex justify-content-between">
            <div className="">
              <h3>{item.name}</h3>

              <p className="text-small text-muted fst-italic">
                {item.category.name}
              </p>
            </div>

            <p>{moment(item.createdAt).format('DD-MM-yyyy')}</p>
          </div>

          <p className="mb-4 bt-2">Stock: {item.stock}</p>

          <p className="description__text mb-4">
            {item.description.substring(0, 160)}...
          </p>

          <div className="">
            <Link className="update__btn" to={`/product/update/${item._id}`}>
              Update Product
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
