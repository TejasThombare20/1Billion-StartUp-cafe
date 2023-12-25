import axios from "axios";
import { avatar } from "../assets";

export const baseUrl = "https://one-trillion.onrender.com"
// "http://localhost:5001";
// "https://billion-the-startup-cafe/us-central1/app";

export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get(`${baseUrl}/api/users/jwtVerification`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// Add new product
export const addProduct = async (data) => {
  try {
    const res = await axios.post(`${baseUrl}/api/products/create`, { ...data });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// get all products
export const getAllProducts = async (data) => {
  try {
    const res = await axios.get(`${baseUrl}/api/products/all`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// delete a product
export const deleteProduct = async (productId) => {
  try {
    const res = await axios.delete(
      `${baseUrl}/api/products/delete/${productId}`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/users/all`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};
// add item to cart
// add new item to cart
export const addNewItemToCart = async (user_id, data) => {
  try {
    console.log(data);
    const res = await axios.post(
      `${baseUrl}/api/products/addToCart/${user_id}`,
      { ...data }
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// get all the cart Item
export const getAllCartItems = async (user_id) => {
  try {
    const res = await axios.get(
      `${baseUrl}/api/products/getCartItems/${user_id}`
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// cart incremennt
export const incrementItemQuantity = async (user_id, product_Id, type) => {
  console.log(user_id, product_Id, type);
  try {
    const res = await axios.post(
      `${baseUrl}/api/products/updateCart/${user_id}`,
      null,
      { params: { product_Id: product_Id, type: type } }
    );

    return res.data.data;
  } catch (err) {
    return null;
  }
};

export const getAllOrder = async (user_id) => {
  try {
    const res = await axios.get(`${baseUrl}/api/products/orders`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

export const updateOrderSts = async(order_id , sts)=>{

  try {
      const res = await axios.post(`${baseUrl}/api/products/updateOrder/${order_id}`,null,
      {params : {sts : sts}})

      return res.data.data
  } catch (error) {
     return null
  }

}

const handleOpenRazorpay = async (data, user, cart) => {
  const cartItemDetails = cart.map((items) => ({
    name: cart.product_name,
    proce: cart.product_price,
  }));
  const options = {
    key: process.env.REACT_APP_RAZORPAY_API_KEY, // Enter the Key ID generated from the Dashboard
    amount: Number(data.amount) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: data.currency,
    order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    name: user.name,
    description: "",
    image: { avatar },

    handler: async function (response) {
      console.log(response);
      await axios
        .post(`${baseUrl}/api/products/verify`, { response: response })
        .then((res) => {
          if (res.data.message === "sign Valid") {
            window.location.href = `http://localhost:3000/checkout-sucess`;
          } else {
            window.location.href = `http://localhost:3000`;
          }
        })
        .catch((err) => {
          console.log(err);
          window.location.href = `http://localhost:3000`;
        });
    },
    prefill: {
      name: " Your Name",
      email: "email",
      contact: "7249344062",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
    products: {
      cart: JSON.stringify(cartItemDetails),
    },
  };
  var rzp = new window.Razorpay(options);
  rzp.open();
};

export const checkoutHandler = async (total, user, cart) => {
  const Data = { total: total };
  await axios
    .post(`${baseUrl}/api/products/orders`, Data)
    .then((res) => {
      console.log(res.data);
      handleOpenRazorpay(res.data.data, user, cart);
    })
    .catch((err) => {
      console.log(err);
    });
};
