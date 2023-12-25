import coffee from '../assets/Album/HotBeverage.png'
import Burgers from '../assets/Album/Burger1.png'
import Pizza from '../assets/Album/Pizza2.jpg'
import Momos from '../assets/Album/Momos.png'
import Shakes from '../assets/Album/Shakes.png'


export const isActiveStyles =
  " text-2xl text-red-700 font-semibold hover:text-red-700 px-4 py-2 duration-100 transition-all ease-in-out";

export const isNotActiveStyles =
  " text-xl text-textColor hover:text-red-700 duration-100 px-4 py-2 transition-all ease-in-out";

export const statuses = [
  { id: 1, title: "Beverages", category: "Hot_Beverages" },
  { id: 2, title: "Pasta", category: "Pasta" },
  { id: 3, title: "Pizza", category: "Pizza" },
  { id: 4, title: "Burgers", category: "Burgers" },
  { id: 5, title: "Momos", category: "Momos" },
  { id: 6, title: "Wraps", category: "Wraps" },
  { id: 7, title: "Sandwich", category: "Sandwich" },
  { id: 8, title: "Sides", category: "Sides" },
  { id: 9, title: "Maggi", category: "Maggi" },
  { id: 10, title: "Drinks", category: "Drinks" },
  { id: 11, title: "Shakes", category: "Shakes" },
  { id: 12, title: "Waffles", category: "Waffles" },
];

export const randomData = [
  {
    id: 1,
    imageURL: `${coffee}`,
    product_name: "Cappucino",
    product_category: "Chocolate & vanilla",
    product_price: "23.00",
  },
  {
    id: 2,
    imageURL: `${Burgers}`,
    product_name: "Burgers",
    product_category: "Fresh Strawberries",
    product_price: "18.00",
  },
  {
    id: 3,
    imageURL: `${Pizza}` ,
    product_name: "Pizza",
    product_category: "Juicy Apples",
    product_price: "16.00",
  },
  {
    id: 4,
    imageURL: `${Momos}`,
    product_name: "Momos",
    product_category: "Mixed Kebab Plate",
    product_price: "22.0",
  },
  {
    id: 5,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/food-app-nov-22.appspot.com/o/Pictures%2F1674797376326_d4.png?alt=media&token=7d37b12c-f3a8-4561-974e-de6574ddfea6",
      
    product_name: "Mojito",
    product_category: "Cocktail Drinks",
    product_price: "10.0",
  },
  {
    id: 6,
    imageURL: `${Shakes}`,
    product_name: "Shakes",
    product_category: "Spicy Masala",
    product_price: "20.0",
  },
];
