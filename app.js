const express = require('express');
const path = require("path")
const app = express();
const mongoose = require('mongoose');
// const cors = require('cors');
require('express-async-errors');
require('dotenv').config()
const userRouter = require('./routes/users');
const auth = require('./middleware/authentication');
const postRouter = require('./routes/posts')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler')
// const allowedOrigins = ['http://localhost:3000', 'http://192.168.55.104:3000']
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }))
app.use(express.json())
app.get('/api/getName', auth, async (req, res) => {
  res.status(200).json({ name: req.user.name })
})
app.use('/', userRouter);
app.use('/api/v1/posts', auth, postRouter);
app.use(express.static("build"))
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"))
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



// const start = async () => {
//   //   try {
//   //     await connectDB(process.env.MONGO_URI)
//   //     app.listen(process.env.PORT, () => {
//   //       console.log(`app listening at ${process.env.PORT}`)
//   //     });
//   //   } catch (error) {
//   //     console.log(error)
//   //   }
//   // }
//   start()
const mongo = process.env.MONGO_URI
mongoose.connect(mongo)
mongoose.connection.on("connected", () => {
  console.log(`connected to db`);
})
mongoose.connection.on("error", () => {
  console.log(`connected to db define error`);
})


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`sun rha hu ${PORT} pe`);
});