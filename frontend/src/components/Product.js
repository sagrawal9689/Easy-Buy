import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded' bg='light'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} style={{color: 'while'}}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='h3' style={{color: 'while'}}>Rs {product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
