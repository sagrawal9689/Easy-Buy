import React, { useEffect } from 'react'
import { Row, Col, Card, Table ,Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails} from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'

const ProfileScreen = ({ location, history }) => {

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name ) {
        dispatch(getUserDetails('profile'))
      }
    }
    dispatch(listMyOrders())
  }, [dispatch, history, userInfo, user])

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  return (
    <Row>
      <Col md={3} >
        <h2>User Profile</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) :(
        <Card border='info'>
          <Row className='px-1 py-1'>
                <Col>Name: </Col>
                <Col>{userInfo ?(user.name):''}</Col>
          </Row>
          <Row className='px-1 py-1'>
                <Col>Email: </Col>
                <Col>{userInfo ?(user.email):''}</Col>
          </Row>
        </Card>
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        { loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
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
      </Col>
    </Row>
  )
}

export default ProfileScreen