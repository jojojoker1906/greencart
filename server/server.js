// import cookieParser from 'cookie-parser';
// import express from 'express';
// import cors from 'cors';
// import dns from "dns";
// import connectDB from './configs/db.js';
// import 'dotenv/config';
// import userRouter from './routes/userRoute.js';
// import sellerRouter from './routes/sellerRoute.js';
// import connectCloudinary from './configs/cloudinary.js';
// import productRouter from './routes/productRoute.js';
// import cartRouter from './routes/cartRoute.js';
// import addressRouter from './routes/addressRoute.js';
// import orderRouter from './routes/orderRoute.js';
// import { stripeWebhooks } from './controllers/orderController.js';

// const app = express();
// const port = process.env.PORT || 4001;


// dns.setServers(["1.1.1.1","8.8.8.8"]);
// await connectDB();
// await connectCloudinary()

// // Allow multiple origins
// const allowedOrigins = ['http://localhost:5173', 'https://greencart-frontend-9han.onrender.com']

// app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

// // Middleware configuration
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({origin: allowedOrigins, credentials: true}));


// app.get('/', (req, res) => res.send("API is Working"));
// app.use('/api/user', userRouter)
// app.use('/api/seller', sellerRouter)
// app.use('/api/product', productRouter)
// app.use('/api/cart', cartRouter)
// app.use('/api/address', addressRouter)
// app.use('/api/order', orderRouter)

// app.listen(port, ()=>{
//     console.log(`Server is running on http://localhost:${port}`)
// })



import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dns from "dns";
import connectDB from './configs/db.js';
import 'dotenv/config';

import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';

import connectCloudinary from './configs/cloudinary.js';
import { stripeWebhooks } from './controllers/orderController.js';

const app = express();
const port = process.env.PORT || 4001;

// DNS fix for MongoDB stability on some hosts
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// DB + Cloudinary connection
await connectDB();
await connectCloudinary();

// =========================
// CORS CONFIG (FIXED)
// =========================
const allowedOrigins = [
  'http://localhost:5173',
  'https://greencart-frontend-9han.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// =========================
// STRIPE WEBHOOK (MUST BE BEFORE express.json)
// =========================
app.post(
  '/stripe',
  express.raw({ type: 'application/json' }),
  stripeWebhooks
);

// =========================
// MIDDLEWARES
// =========================
app.use(express.json());
app.use(cookieParser());

// =========================
// ROUTES
// =========================
app.get('/', (req, res) => {
  res.send("API is Working");
});

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// =========================
// SERVER START
// =========================
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});