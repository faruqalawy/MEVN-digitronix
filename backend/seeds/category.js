import mongoose from "mongoose";
import Category from "../models/categoryModel.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB: " + err))

async function seed() {
    const categories = [
      {
        "name": "Audio & Video",
        "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/category-1",
        "products": [
          {
            "name": "UltraSound Bluetooth Speaker",
            "price": 500000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-1",
            "features": [
              "360-degree sound",
              "10-hour battery life",
              "Water-resistant",
              "Bluetooth 5.0",
              "Built-in microphone"
            ]
          },
          {
            "name": "CinemaSound Home Theater System",
            "price": 15000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-1",
            "features": [
              "7.1 surround sound",
              "Dolby Atmos",
              "Wireless subwoofer",
              "4K pass-through",
              "Voice control"
            ]
          },
          {
            "name": "MegaBass Wireless Headphones",
            "price": 1200000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-1",
            "features": [
              "Noise cancellation",
              "20-hour battery life",
              "Comfortable ear pads",
              "Built-in microphone",
              "Fast charging"
            ]
          },
          {
            "name": "CrystalClear 4K TV",
            "price": 8000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-1",
            "features": [
              "4K Ultra HD resolution",
              "HDR support",
              "Smart TV",
              "Voice control",
              "Thin bezel design"
            ]
          },
          {
            "name": "SoundWave Portable Speaker",
            "price": 750000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-1",
            "features": [
              "Compact design",
              "8-hour battery life",
              "Waterproof",
              "Bluetooth 5.0",
              "Enhanced bass"
            ]
          },
          {
            "name": "HiFi Stereo System",
            "price": 2500000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-1",
            "features": [
              "CD player",
              "FM/AM radio",
              "Bluetooth connectivity",
              "Remote control",
              "Multiple input options"
            ]
          }
        ]
      },
      {
        "name": "Gadgets",
        "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/category-2",
        "products": [
          {
            "name": "SmartWatch X Pro",
            "price": 2500000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-2",
            "features": [
              "Heart rate monitor",
              "GPS tracking",
              "Waterproof",
              "Touchscreen display",
              "App notifications"
            ]
          },
          {
            "name": "Virtual Reality Headset",
            "price": 5000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-2",
            "features": [
              "4K display",
              "360-degree tracking",
              "Comfortable fit",
              "Built-in headphones",
              "Wireless connection"
            ]
          },
          {
            "name": "Smart Home Assistant",
            "price": 1500000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-2",
            "features": [
              "Voice control",
              "Smart home integration",
              "Music streaming",
              "Weather updates",
              "Bluetooth speaker"
            ]
          },
          {
            "name": "Wireless Charging Pad",
            "price": 300000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-2",
            "features": [
              "Fast charging",
              "Overheat protection",
              "LED indicator",
              "Compact design",
              "Universal compatibility"
            ]
          },
          {
            "name": "4K Action Camera",
            "price": 2000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-2",
            "features": [
              "4K video recording",
              "Waterproof",
              "Image stabilization",
              "Wide-angle lens",
              "Wi-Fi connectivity"
            ]
          },
          {
            "name": "Portable Power Bank",
            "price": 600000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-2",
            "features": [
              "10000mAh capacity",
              "Fast charging",
              "LED flashlight",
              "Compact design",
              "Multiple USB ports"
            ]
          }
        ]
      },
      {
        "name": "Gaming",
        "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/category-3",
        "products": [
          {
            "name": "Gaming Laptop Pro",
            "price": 22000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-3",
            "features": [
              "Intel Core i9",
              "16GB RAM",
              "NVIDIA RTX 3080",
              "1TB SSD",
              "RGB keyboard"
            ]
          },
          {
            "name": "4K Gaming Monitor",
            "price": 10000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-3",
            "features": [
              "4K resolution",
              "144Hz refresh rate",
              "HDR support",
              "G-Sync compatible",
              "Adjustable stand"
            ]
          },
          {
            "name": "Mechanical Gaming Keyboard",
            "price": 1500000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-3",
            "features": [
              "Mechanical switches",
              "RGB backlighting",
              "Programmable keys",
              "Ergonomic design",
              "USB passthrough"
            ]
          },
          {
            "name": "Gaming Mouse Pro",
            "price": 500000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-3",
            "features": [
              "Adjustable DPI",
              "RGB lighting",
              "Ergonomic design",
              "Programmable buttons",
              "Ultra-lightweight"
            ]
          },
          {
            "name": "VR Gaming System",
            "price": 12000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-3",
            "features": [
              "4K VR headset",
              "360-degree tracking",
              "Wireless controllers",
              "Built-in audio",
              "Comfortable fit"
            ]
          },
          {
            "name": "Wireless Gaming Headset",
            "price": 2500000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-3",
            "features": [
              "Surround sound",
              "Noise cancellation",
              "Long battery life",
              "Comfortable fit",
              "Wireless range"
            ]
          }
        ]
      },
      {
        "name": "Home Appliances",
        "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/category-4",
        "products": [
          {
            "name": "Smart Air Conditioner",
            "price": 6000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-4",
            "features": [
              "Remote control",
              "Energy saving mode",
              "Wi-Fi connectivity",
              "Quiet operation",
              "Smart scheduling"
            ]
          },
          {
            "name": "Robot Vacuum Cleaner",
            "price": 4000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-4",
            "features": [
              "Auto navigation",
              "App control",
              "HEPA filter",
              "Self-charging",
              "Multiple cleaning modes"
            ]
          },
          {
            "name": "Smart Washing Machine",
            "price": 8000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-4",
            "features": [
              "AI wash cycle",
              "Energy efficient",
              "Wi-Fi control",
              "Large capacity",
              "Quick wash option"
            ]
          },
          {
            "name": "Smart Refrigerator",
            "price": 12000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-4",
            "features": [
              "Touchscreen display",
              "Energy efficient",
              "Wi-Fi control",
              "Ice and water dispenser",
              "Smart temperature control"
            ]
          },
          {
            "name": "Air Purifier Pro",
            "price": 2500000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-4",
            "features": [
              "HEPA filter",
              "Smart sensors",
              "Quiet operation",
              "Wi-Fi control",
              "Air quality display"
            ]
          },
          {
            "name": "Smart Thermostat",
            "price": 3000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-4",
            "features": [
              "Remote control",
              "Energy saving mode",
              "Touchscreen display",
              "Wi-Fi connectivity",
              "Smart scheduling"
            ]
          }
        ]
      },
      {
        "name": "Kitchen Appliances",
        "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/category-5",
        "products": [
          {
            "name": "Smart Oven",
            "price": 5000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-5",
            "features": [
              "Wi-Fi control",
              "Multiple cooking modes",
              "Touchscreen display",
              "Self-cleaning",
              "Energy efficient"
            ]
          },
          {
            "name": "Automatic Coffee Maker",
            "price": 1500000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-5",
            "features": [
              "Programmable settings",
              "Built-in grinder",
              "Auto shut-off",
              "Multiple brew sizes",
              "Easy to clean"
            ]
          },
          {
            "name": "Smart Blender",
            "price": 1000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-5",
            "features": [
              "Multiple speed settings",
              "Touchscreen display",
              "Self-cleaning",
              "Durable blades",
              "Large capacity"
            ]
          },
          {
            "name": "Food Processor",
            "price": 2000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-5",
            "features": [
              "Multiple attachments",
              "Large capacity",
              "Easy to clean",
              "Durable construction",
              "Safety features"
            ]
          },
          {
            "name": "Dishwasher Pro",
            "price": 4000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-5",
            "features": [
              "Energy efficient",
              "Quiet operation",
              "Multiple wash cycles",
              "Delay start",
              "Smart sensors"
            ]
          },
          {
            "name": "HeatWave Pro - 1200W, 1.2 cu ft, Inverter Technology",
            "price": 800000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-5",
            "features": [
              "1200W High Power for Fast Cooking and Heating",
              "1.2 Cubic Feet Capacity for Large Meals",
              "Advanced Inverter Technology for Even Heating",
              "10 Power Levels and 6 Preset Cooking Modes",
              "Easy-to-Use Digital Display and Timer Function"
            ]
          }
        ]
      },
      {
        "name": "PC & Laptops",
        "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/category-6",
        "products": [
          {
            "name": "TechMaster i9 Pro - Intel Core i9, 32GB RAM, 1TB SSD",
            "price": 19000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-6",
            "features": [
              "Intel Core i9",
              "32GB RAM",
              "1TB SSD",
              "NVIDIA RTX 3080",
              "4K display"
            ]
          },
          {
            "name": "SpeedBook Ryzen X - AMD Ryzen 9, 16GB RAM, 512GB SSD",
            "price": 18000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-6",
            "features": [
              "AMD Ryzen 9",
              "16GB RAM",
              "512GB SSD",
              "Radeon RX 6800M",
              "144Hz display"
            ]
          },
          {
            "name": "UltraNote Elite - Intel Core i7, 16GB RAM, 512GB SSD",
            "price": 12000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-6",
            "features": [
              "Intel Core i7",
              "16GB RAM",
              "512GB SSD",
              "NVIDIA GTX 1660 Ti",
              "Full HD display"
            ]
          },
          {
            "name": "PowerLaptop Max - Intel Core i5, 8GB RAM, 256GB SSD",
            "price": 9500000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-6",
            "features": [
              "Intel Core i5",
              "8GB RAM",
              "256GB SSD",
              "Intel Iris Xe Graphics",
              "Full HD display"
            ]
          },
          {
            "name": "ProBook Ultra - AMD Ryzen 7, 16GB RAM, 1TB SSD",
            "price": 12000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-6",
            "features": [
              "AMD Ryzen 7",
              "16GB RAM",
              "1TB SSD",
              "Radeon Vega 10",
              "Full HD display"
            ]
          },
          {
            "name": "SlimBook X Pro - Intel Core i5, 16GB RAM, 512GB SSD",
            "price": 11000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-6",
            "features": [
              "Intel Core i5",
              "16GB RAM",
              "512GB SSD",
              "Intel Iris Xe Graphics",
              "Full HD display"
            ]
          }
        ]
      },
      {
        "name": "Photography",
        "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/category-7",
        "products": [
          {
            "name": "Professional DSLR Camera",
            "price": 20000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-7",
            "features": [
              "45.7 Megapixel sensor",
              "4K video recording",
              "Dual card slots",
              "Built-in Wi-Fi",
              "Weather-sealed body"
            ]
          },
          {
            "name": "4K Mirrorless Camera",
            "price": 15000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-7",
            "features": [
              "24.2 Megapixel CMOS Sensor",
              "4K Ultra HD Video Recording",
              "In-Body Image Stabilization",
              "Touchscreen LCD Display",
              "Wi-Fi and Bluetooth Connectivity"
            ]
          },
          {
            "name": "Photography Lighting Kit",
            "price": 3000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-7",
            "features": [
              "Adjustable brightness",
              "Color temperature control",
              "Portable design",
              "Includes light stands",
              "Battery and AC power"
            ]
          },
          {
            "name": "High-Resolution Lens",
            "price": 10000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-7",
            "features": [
              "F1.4 aperture",
              "Autofocus",
              "Weather-sealed",
              "Anti-reflective coating",
              "Compatible with multiple mounts"
            ]
          },
          {
            "name": "Quantum Drone X High Performance Aerial Camera",
            "price": 1200000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-7",
            "features": [
              "4K camera",
              "GPS tracking",
              "Long flight time",
              "Stabilized gimbal",
              "Live video streaming"
            ]
          },
          {
            "name": "Portable Photo Printer",
            "price": 2000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-7",
            "features": [
              "Wireless printing",
              "Compact design",
              "High-quality prints",
              "Compatible with multiple devices",
              "Easy to use"
            ]
          }
        ]
      },
      {
        "name": "Wearable Devices",
        "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/category-8",
        "products": [
          {
            "name": "Fitness Tracker",
            "price": 1000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product_8",
            "features": [
              "Heart rate monitor",
              "Step counter",
              "Sleep tracking",
              "Waterproof",
              "Long battery life"
            ]
          },
          {
            "name": "Smartwatch",
            "price": 2500000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product_8",
            "features": [
              "Touchscreen display",
              "App notifications",
              "GPS tracking",
              "Heart rate monitor",
              "Waterproof"
            ]
          },
          {
            "name": "Smart Glasses",
            "price": 5000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product_8",
            "features": [
              "AR display",
              "Voice control",
              "Bluetooth connectivity",
              "Lightweight design",
              "Long battery life"
            ]
          },
          {
            "name": "Health Monitor Band",
            "price": 1500000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product_8",
            "features": [
              "Heart rate monitor",
              "Blood pressure monitor",
              "Sleep tracking",
              "Waterproof",
              "Long battery life"
            ]
          },
          {
            "name": "Bluetooth Earbuds",
            "price": 1000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product_8",
            "features": [
              "Wireless charging",
              "Noise cancellation",
              "Touch controls",
              "Water-resistant",
              "Long battery life"
            ]
          },
          {
            "name": "Wearable ECG Monitor",
            "price": 3000000,
            "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product_8",
            "features": [
              "ECG monitoring",
              "Heart rate tracking",
              "Bluetooth connectivity",
              "Long battery life",
              "Compact and lightweight",
              "Real-time heart health data",
              "User-friendly mobile app"
            ]
          }
        ]
      }
    ]
      
      try {
        const categoriesCount = await Category.countDocuments();
        if (categoriesCount > 0) {
            console.log("Data categories sudah ada, mencatat ulang...");
            await Category.deleteMany({});
        }
        await Category.insertMany(categories)
      } catch (error) {
        console.log("Terjadi kesalahan saat menyimpan data categories: " + error.message)
      } finally {
        mongoose.connection.close();
        console.log("Data categories berhasil disimpan");
      }
}

seed();