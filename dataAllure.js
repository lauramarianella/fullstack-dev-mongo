let items = [
  {
    id: 1,
    idDresser: 1,
    idService: 4,
    idCity: 1,
    title: 'haircut women',
    description: 'Cut women',
    imgSrc: '/images/womenBeforeAfter.jpg',
    cost: 50,
  },
  {
    id: 2,
    idDresser: 1,
    idService: 6,
    idCity: 1,
    title: 'coloring',
    description: 'Coloring women, full root covering',
    imgSrc: '/images/coloringBeforeAfter.jpg',
    cost: 70,
  },
  {
    id: 3,
    idDresser: 1,
    idService: 1,
    idCity: 1,
    title: 'haircut men',
    description: 'Cut men, from long to short',
    imgSrc: '/images/menBeforeAfter.jpg',
    cost: 30,
  },
  {
    id: 4,
    idDresser: 2,
    idService: 4,
    idCity: 2,
    title: 'haircut women',
    description: 'Cut women',
    imgSrc: '/images/womenBeforeAfter.jpg',
    cost: 50,
  },
  {
    id: 5,
    idDresser: 2,
    idService: 6,
    idCity: 2,
    title: 'coloring',
    description: 'Coloring women, full root covering',
    imgSrc: '/images/coloringBeforeAfter.jpg',
    cost: 70,
  },
  {
    id: 7,
    idDresser: 3,
    idService: 4,
    idCity: 3,
    title: 'haircut women',
    description: 'Cut women',
    imgSrc: '/images/womenBeforeAfter.jpg',
    cost: 50,
  },
  {
    id: 8,
    idDresser: 3,
    idService: 6,
    idCity: 3,
    title: 'coloring',
    description: 'Coloring women, full root covering',
    imgSrc: '/images/coloringBeforeAfter.jpg',
    cost: 70,
  },
  {
    id: 9,
    idDresser: 3,
    idService: 1,
    idCity: 3,
    title: 'haircut men',
    description: 'Cut men, from long to short',
    imgSrc: '/images/menBeforeAfter.jpg',
    cost: 30,
  },
];

let services = [
  { id: 1, service: 'men haircut' },
  { id: 2, service: 'boys haircut' },
  { id: 3, service: 'girls haircut' },
  { id: 4, service: 'women haircut' },
  { id: 5, service: 'styling' },
  { id: 6, service: 'applying color' },
];

let dressers = [
  { id: 1, name: 'Miranda', city: 1, address: 'addr Longueuil' },
  { id: 2, name: 'Lojanita', city: 2, address: 'addr Montreal' },
  { id: 3, name: 'Vecina', city: 1, address: 'addr Longueil' },
  { id: 4, name: 'Lola', city: 3, address: 'addr Laval' },
];

let rates = [
  { idDresser: 1, idService: 1, g: 20.0, s: 0, m: 0, l: 0 },
  { idDresser: 1, idService: 4, g: 0, s: 20.0, m: 40.0, l: 60.0 },
  { idDresser: 1, idService: 3, g: 30.0, s: 0, m: 0, l: 0 },
  { idDresser: 1, idService: 5, g: 0, s: 30.0, m: 60.0, l: 90.0 },
  { idDresser: 1, idService: 6, g: 0, s: 50.0, m: 90.0, l: 110.99 },

  { idDresser: 2, idService: 4, g: 0, s: 20, m: 40, l: 60 },
  { idDresser: 2, idService: 3, g: 30, s: 0, m: 0, l: 0 },
  { idDresser: 2, idService: 5, g: 0, s: 30, m: 60, l: 90 },
  { idDresser: 2, idService: 6, g: 0, s: 50, m: 90, l: 110 },

  { idDresser: 3, idService: 1, g: 20, s: 0, m: 0, l: 0 },
  { idDresser: 3, idService: 4, g: 0, s: 20, m: 40, l: 60 },
  { idDresser: 3, idService: 3, g: 30, s: 0, m: 0, l: 0 },
  { idDresser: 3, idService: 5, g: 0, s: 30, m: 60, l: 90 },
  { idDresser: 3, idService: 6, g: 0, s: 50, m: 90, l: 110 },
];

let cities = [
  { id: 1, name: 'Longueuil' },
  { id: 2, name: 'Montreal' },
  { id: 3, name: 'Laval' },
];

module.exports = { items, services, dressers, rates, cities };
