import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, clearErrors } from '../../actions/productAction';
import { toast } from 'sonner';
import ProductCard from '../../components/productCard/ProductCard';
import Loader from '../../components/loader/Loader';
import Pagination from 'react-js-pagination';
import './ProductList.scss';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();

  const { loading, products, productsCount, resultPerPage, error } =
    useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }


    dispatch(getProducts(currentPage));
  }, [dispatch, error, currentPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="productList__container container">
            <div className="d-flex flex-column flex-md-row">
              <div className="p-3">
                <div className="header__container d-flex justify-content-between align-items-center mb-2">
                  <h3>All Products ({productsCount})</h3>

                  <Link to={'/product/new'} className="create__btn">
                    Create Product
                  </Link>
                </div>
                <div className="d-flex flex-wrap justify-content-around align-items-center">
                  {products.map((item) => (
                    <ProductCard item={item} key={item._id} />
                  ))}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center pb-3">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={handlePageChange}
                nextPageText=">"
                prevPageText="<"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductList;
