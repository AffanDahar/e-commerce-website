import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../commponents/Message";
import Loader from "../commponents/Loader";
import { listOrders } from "../actions/orderActions";


const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const orderList = useSelector(state => state.orderList);
  const { loading, error, orders } = orderList;
  console.log(orderList)

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history,userInfo]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Table stripped bordered hover responsive className="table-sm">
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Total</th>
            <th>Paid At</th>
            <th>Deliverd</th>
            <th></th>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0,10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                  order.paidAt.substring(0,10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDeliverd ? (
                  order.deliveredAt.substring(0,10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                <LinkContainer to={`/orders/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
