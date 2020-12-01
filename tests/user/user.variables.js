const {
  SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASSWORD,
} = require('../../dotenvValidator');

const superAdminUser = {
  email: SUPER_ADMIN_EMAIL,
  password: SUPER_ADMIN_PASSWORD,
};

const newAdmin = {
  email: 'admintest4@gmail.com',
  firstName: 'Hook',
  lastName: 'Age',
  pass: 'dffdsfsdsdf',
};

const testUsersSet = [
  {
    firstName: 'Albina',
    lastName: 'Todoriyk',
    email: 'albinaT@gmail.com',
    pass: 'qwertY123',
    language: 1,
    banned: true,
  },
  {
    firstName: 'Denis',
    lastName: 'Babarin',
    email: 'denisBB@gmail.com',
    pass: 'qwertY124',
    language: 1,
    banned: false,
  },
  {
    firstName: 'Zelda',
    lastName: 'Evense',
    email: 'zeldaB@gmail.com',
    pass: 'qwertY125',
    language: 1,
    banned: false,
  },
  {
    firstName: 'Pepo',
    lastName: 'Markelo',
    email: 'example@gmail.com',
    pass: 'qwertY123',
    language: 1,
    banned: true,
  },
  {
    firstName: 'Petro',
    lastName: 'Tatsenyak',
    email: 'f5dbbdnvf1@gmail.com',
    pass: '12345678Pt',
    language: 1,
    banned: true,
  },
];

const testUser = {
  firstName: 'Petro',
  lastName: 'Tatsenyak',
  email: 'qwerdsd223@gmail.com',
  pass: '12345678Pt',
  phoneNumber: '380666666666',
  role: 'admin',
  language: 1,
  address: {
    country: 'Ukraine',
    city: 'Kiev',
    street: 'Shevchenka',
    buildingNumber: '23',
  },
  wishlist: [],
  orders: [],
  comments: [],
};

const user = {
  firstName: 'Pepo',
  lastName: 'Markelo',
  email: '1xamp31d2v1@gmail.com',
  pass: 'qwertY123',
  language: 1,
};

module.exports = {
  newAdmin,
  superAdminUser,
  testUser,
  testUsersSet,
  user,
};
