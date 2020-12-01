const newOrder = {
  status: 'DELIVERED',
  user: {
    firstName: 'Test',
    lastName: 'Test',
    patronymicName: 'Test',
    email: 'test@gmail.com',
    phoneNumber: '380953544271',
  },
  address: {
    country: 'Україна',
    region: 'Кіровоградська область',
    city: 'Новомиргород',
    zipcode: '98908',
    street: 'Бульвар Марії Приймаченко',
    buildingNumber: '25',
    appartment: '97',
  },
  delivery: {
    sentBy: 'Nova Poshta',
    byCourier: true,
    courierOffice: 10,
    invoiceNumber: '6280260',
    cost: [
      {
        currency: 'UAH',
        value: 7000,
      },
      {
        currency: 'USD',
        value: 240,
      },
    ],
  },
  items: [
    {
      category: [
        {
          lang: 'uk',
          value: 'Сумки',
        },
        {
          lang: 'en',
          value: 'Bags',
        },
      ],
      subcategory: [
        {
          lang: 'uk',
          value: 'Сумки',
        },
        {
          lang: 'en',
          value: 'Bags',
        },
      ],
      model: [
        {
          lang: 'uk',
          value: 'Сумка з гобеленом',
        },
        {
          lang: 'en',
          value: 'Bag with a Pattern',
        },
      ],
      name: [
        {
          lang: 'uk',
          value: 'Сумка з гобеленом синя',
        },
        {
          lang: 'en',
          value: 'Bag with a Pattern Blue',
        },
      ],
      colors: [
        [
          {
            lang: 'uk',
            value: 'Сталево-блакитний',
          },
          {
            lang: 'en',
            value: 'Steel-blue',
          },
        ],
      ],
      pattern: [
        {
          lang: 'uk',
          value: 'Олені',
        },
        {
          lang: 'en',
          value: 'Deers',
        },
      ],
      closure: [],
      closureColor: '',
      size: {
        heightInCm: 38,
        widthInCm: 36,
        depthInCm: 10,
        volumeInLiters: 0,
        weightInKg: 0,
      },
      bottomMaterial: [
        {
          lang: 'uk',
          value: 'Тканина Кордура',
        },
        {
          lang: 'en',
          value: 'Cordura fabric',
        },
      ],
      bottomColor: [
        {
          lang: 'uk',
          value: 'чорний',
        },
        {
          lang: 'en',
          value: 'black',
        },
      ],
      additions: [],
      actualPrice: [
        {
          currency: 'UAH',
          value: 90000,
        },
        {
          currency: 'USD',
          value: 3246,
        },
      ],
      quantity: 1,
    },
  ],
  paymentMethod: 'CARD',
};

const newOrderMutation = {
  ...newOrder,
  status: 'SENT',
};

const updatedData = {
  user: {
    firstName: 'Updated',
    lastName: 'Updated',
    patronymicName: 'Updated',
    email: 'test.updated@gmail.com',
    phoneNumber: '380953544271',
  },
};

const deliveryOrder = {
  sentBy: 'Nova Poshta',
  byCourier: true,
  courierOffice: 10,
  invoiceNumber: '6280260',
  sentOn: null,
};
const newOrderUpdated = {
  ...newOrderMutation,
  ...updatedData,
};

module.exports = {
  newOrder,
  newOrderUpdated,
  newOrderMutation,
  deliveryOrder,
};
