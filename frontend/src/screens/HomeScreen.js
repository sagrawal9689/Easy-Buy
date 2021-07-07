import React, { useEffect , useState} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = ({ match }) => {
  
  const [products,setProducts]= useState([])
  useEffect(() => {
    const fetchProducts=async ()=>{
      const {data}= await axios.get('/api/products')
      //console.log(data)
      setProducts(data.products)
    }
    fetchProducts()
  }, [])

  return (
    <>
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      <h1>Latest Products</h1>
      {
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
      }
    </>
  )
}

export default HomeScreen
