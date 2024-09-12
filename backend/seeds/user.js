import mongoose from "mongoose";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB: " + err))

async function seed() {
    const user = [
        {
            "_id": "66dbf47aa5b3c1f8f15eaf84",
          "username": "admin",
          "email": "admin@example.com",
          "carts": [],
          "salt": "25e5513ae95b25bc038dd2386e90e78e0e2f4d908b2c9a866456f775894af93c",
          "hash": "039d03142af156a9cdef434b93cb3b052bcc346414d44d31e6f5e4c2cf1c87820a06de9348ef78cc284506f430d21995ec472c4c2a5024eed952bdaa3f5a98534ac6790b2446cad152f4f71c7281542f8f31f57a307ff98bcef6955d0b3434ba38b5c5cad66fe22494bacadd5f7c693f0fc877acce0e1c29b6da8b1e7272ea7f234fbfdd9c7eadb3e50c6ce04a57bcc69a0d1cce0d64f88613488ff6443ed88d4811f8c3c6824be1f306a7093281ac07a9164b03d05615cd5cef86d16b69138bb62496b83dd21dcb3884ce06c6849a5aa55f4604ed123b34e2e6a6a46c66e973ff07666c7acfd6f88887a677e1f09ddf873ff1f835933501f008fba765c65d3814e2c72eda14a82496aa49b3a6f748311331aefe3667f8534eb4d2a475c70ecaadd4fa0a9b55a13426085836f0bf12717aff624372ff7b4cb43a930e79e2c92fddac7c71ff5cd49527643e0abb8b208d121ed537ac13c408aa0e9b642767c60b7683083b11810394c1cb323a23532b5cf3ad40dcd21d4d5545d5ba97200fe037fcb4ad40d0c50fb10ee3b82aacdd76566137e1d401b835fa5ae4cf505444f9d5f04bbe363563e2f4fa34a6ebd3b748ba6dfd340de4269d92526d1dacac9cd7e046357f0aebcbdc9e601f1bc7bb0668e528867141aa2dd20fa5eb3d7911cd41b5e720c0bb5aa73c7558d3662c9418c626a7e94d2bd8e4a5ef6d29da6d080680ea",
          "__v": 21
        }
      ]

      try {
        const userCount = await User.countDocuments();
        if (userCount > 0) {
            console.log("Data user sudah ada, mencatat ulang...");
            await User.deleteMany({});
        }
        await User.insertMany(user)
      } catch (error) {
        console.log("Terjadi kesalahan saat menyimpan data user: " + error.message)
      } finally {
        mongoose.connection.close();
        console.log("Data user berhasil disimpan");
      }
}

seed();