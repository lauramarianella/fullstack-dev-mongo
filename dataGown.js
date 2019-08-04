let items = [
  {
    id: 1,
    name: 'top',
    description: 'tank top',
    type: 1,
    characteristics: { color: 'red', price: 10, formality: 4 },
  },
  {
    id: 2,

    name: 'pants',
    description: 'for the office',
    type: 2,
    characteristics: { color: 'black', price: 50, formality: 4 },
  },
  {
    id: 3,

    name: 'dress',
    description: 'cocktail dress',
    type: 3,
    characteristics: { color: 'black', price: 90, formality: 2 },
  },
  {
    id: 4,

    name: 'gown',
    description: 'prom dress',
    type: 4,
    characteristics: { color: 'black', price: 90, formality: 1 },
  },
];

let mapType = {};
mapType['tops'] = 1;
mapType['bottoms'] = 2;
mapType['dress'] = 3;
mapType['gown'] = 4;

let mapFormality = {};
mapFormality['black tie'] = 1;
mapFormality['cocktail'] = 2;
mapFormality['night out'] = 3;
mapFormality['daytime'] = 4;

module.exports = { items, mapType, mapFormality };
