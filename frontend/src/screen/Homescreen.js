import React, {  useEffect } from "react";
import Product from "../commponents/Product";
import { Row, Col } from "react-bootstrap";
import { listProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../commponents/Message";
import Loader from "../commponents/Loader";
import Peginate from "../commponents/Peginate";
import ProductCrousel from "../commponents/ProductCrousel";

const Homescreen = ({match}) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber
  const dispatch = useDispatch();

  const productlist = useSelector(state => state.productList);
  const { loading, error, products , page , pages } = productlist;

  useEffect(() => {
    dispatch(listProduct(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
    {!keyword && <ProductCrousel/>}

      <h1 className="latestProduct">Latest Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        <Row>
          {products.map(product => (
            <Col key={product._id} sm={12} md={3} lg={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        
          <Peginate page={page} pages={pages} keyword={keyword ? keyword : ''}/>
        
        </>
      )}
    </>
  );
};

export default Homescreen;
