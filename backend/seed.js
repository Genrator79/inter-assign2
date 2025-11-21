const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Dish = require('./models/Dish');
const User = require('./models/User');
require('dotenv').config();

const dishes = [
    {
        dishId: "1",
        dishName: "Jeera Rice",
        imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/jeera-rice.jpg",
        isPublished: true
    },
    {
        dishId: "2",
        dishName: "Paneer Tikka",
        imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/paneer-tikka.jpg",
        isPublished: true
    },
    {
        dishId: "3",
        dishName: "Rabdi",
        imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/rabdi.jpg",
        isPublished: true
    },
    {
        dishId: "4",
        dishName: "Chicken Biryani",
        imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/chicken-biryani.jpg",
        isPublished: true
    },
    {
        dishId: "5",
        dishName: "Alfredo Pasta",
        imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/alfredo-pasta.jpg",
        isPublished: true
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        await Dish.deleteMany({});
        await User.deleteMany({});

        await Dish.insertMany(dishes);
        console.log('Dishes seeded');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password', salt);

        const user = new User({
            username: 'admin',
            password: hashedPassword
        });

        await user.save();
        console.log('Admin user created');

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
