import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'sahil',
    email: 'sahil@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'test2',
    email: 'test2@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
