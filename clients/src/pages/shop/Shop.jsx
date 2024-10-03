import React, { useEffect, Fragment, useState } from 'react';
import BreadCrumbSection from '../../components/breadCrumbSection/BreadCrumbSection';
import ProductCard from '../../components/productCard/ProductCard';
import Loader from '../../components/loader/Loader';
import { BiSearch } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import { getCategory } from '../../actions/categoryAction';
import Pagination from 'react-js-pagination';
import { PiSlidersHorizontalLight } from 'react-icons/pi';
import { IoCloseOutline } from 'react-icons/io5';
import { toast } from 'sonner';
import './Shop.scss';

const sortItems = [
  {
    value: '',
    name: 'Default',
  },
  {
    value: 'price',
    name: 'Ascending Price',
  },
  {
    value: '-price',
    name: 'Descending Price',
  },
];

const Shop = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [keyword, setKeyword] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const { categories } = useSelector((state) => state.categories);

  const handlePageChange = (e) => {
    setCurrentPage(e);
  };

  const togglePanel = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, sort, category));
  }, [dispatch, keyword, currentPage, sort, category, error]);

  return (
    <Fragment>
      <BreadCrumbSection title="Shop" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <section className="pt-2 pb-3">
            <div className="container">
              <div className="row">
                {products &&
                  products.map((p) => <ProductCard product={p} key={p._id} />)}
              </div>
            </div>
          </section>
          <div className="pagination__wrapper pb-3">
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

          <div className="filter__btn">
            <button
              className="d-flex align-items-center justify-content-evenly"
              onClick={togglePanel}
            >
              <span>FILTER</span>
              <span>
                <PiSlidersHorizontalLight size={26} />
              </span>
            </button>
          </div>
          {showFilterPanel && (
            <>
              <div className="overlay"></div>
              <div className="filter__panel">
                <div className="panel__header">
                  <div className="filter__label">FILTER</div>
                  <span onClick={togglePanel}>
                    <IoCloseOutline size={24} />
                  </span>
                </div>
                <div className="panel__body">
                  <div className="block-2">
                    <div className="filter__title">Sort</div>
                    <ul className="filter__items">
                      {sortItems.map((item, index) => (
                        <li
                          className="filter__item"
                          value={item.value}
                          key={index}
                          onClick={() => {
                            setSort(item.value);
                          }}
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="block-3">
                    <div className="filter__title">Category</div>
                    <ul className="filter__items">
                      <li
                        className="filter__item"
                        onClick={() => setCategory(null)}
                      >
                        All
                      </li>
                      {categories.map((c) => (
                        <li
                          className="filter__item"
                          key={c._id}
                          onClick={() => setCategory(c._id)}
                        >
                          {c.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Shop;
