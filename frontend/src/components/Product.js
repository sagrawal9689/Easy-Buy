import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded' bg='dark'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} style={{color: 'while'}}>
          <Card.Title as='div' id='main-card-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='h3' style={{color: 'white'}}>Rs {product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
