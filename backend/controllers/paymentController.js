import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import dotenv from "dotenv";
import Cart from "../models/cartModel.js";
import OrderAddress from "../models/addressModel.js";
import Order from "../models/orders.js";
import OrderTransaction from "../models/orderTransactionModel.js";
dotenv.config();

const stripeApiKey = process.env.STRIPE_KEY;
const stripe = Stripe(stripeApiKey);

const generateClientSecret = asyncHandler(async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(req.body.cartItems.cartItems),
    },
  });
  let line_items = req.body.cartItems.cartItems.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: [`http://localhost:5173/${item?.image}`],
          description: item.description,
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "inr",
          },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "inr",
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    line_items,
    mode: "payment",
    success_url: "http://localhost:5173/checkout-success",
    cancel_url: "http://localhost:5173/checkout-error",
  });
  res.send({ url: session.url });
});

const orderAddress = async (req, res) => {
  try {
    const { userId, fullName, mobileNo, houseNo, address, city, postalCode } =
      req.body;
    let existingAddress = await OrderAddress.findOne({ userId });
    if (existingAddress) {
      // Update the existing address with the new values
      existingAddress.userId = userId;
      existingAddress.fullName = fullName;
      existingAddress.mobileNo = mobileNo;
      existingAddress.houseNo = houseNo;
      existingAddress.city = city;
      existingAddress.address = address;
      existingAddress.postalCode = postalCode;
      await existingAddress.save();
      res.status(200).json({ success: true, address: existingAddress });
    } else {
      // Create a new address if it doesn't exist
      const orderAddress = await OrderAddress.create({
        userId,
        fullName,
        mobileNo,
        houseNo,
        address,
        city,
        postalCode,
      });
      res.status(200).json({ success: true, address: orderAddress });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//Extracting Data From Stripe Using Webhook

//createOrder
const createOrder = async (customer, data, res) => {
  let Items = JSON.parse(customer.metadata.cart);
  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: Items,
    subTotal: data.amount_subtotal / 100,
    paymentStatus: data.payment_status,
  });
  console.log("new");
  const transaction = new OrderTransaction({
    transactionId: data.id,
    name: data.customer_details.name,
    phoneNo: data.customer_details.phone,
    email: data.customer_details.email,
    subTotal: data.amount_subtotal / 100,
    status: data.status,
  });

  try {
    const savedOrder = await newOrder.save();
    const order_transaction = await transaction.save();
    res.status(200).send(savedOrder, order_transaction);
  } catch (err) {
    console.log("Error saving order:", err.message);
  }
};

const webhook = asyncHandler(async (request, response) => {
  let endpointSecret;
  const sig = request.headers["stripe-signature"];
  let data;
  let eventType;
  if (endpointSecret) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = request.body.data.object;
    eventType = request.body.type;
  }
  if (eventType === "checkout.session.completed") {
    try {
      await stripe.customers.retrieve(data.customer).then((customer) => {
        createOrder(customer, data);
      });
    } catch (err) {
      console.log(err.message);
      return response.status(500).send(`Error: ${err.message}`);
    }
  }
  return response.sendStatus(200);
});

export { generateClientSecret, orderAddress, webhook };
