import mongoose from 'mongoose';
import connectDB from '../repositories';
import User from '../models/user.model';
import Friendship from '../models/friendship.model';
import argon2 from 'argon2'; // Import Argon2

const usersData = [
  { 
    first_name: 'Alice', 
    last_name: 'Dupont', 
    email: 'alice@example.com', 
    password: 'password123', 
    birthday: '1998-01-15', 
    native_language: "fr",  // 'fr' for French
    learning_language: "en", // 'en' for English
    bio: 'I love traveling and learning new languages.'
  },
  { 
    first_name: 'Bob', 
    last_name: 'Martin', 
    email: 'bob@example.com', 
    password: 'password123', 
    birthday: '1990-05-22', 
    native_language: "en",  // 'en' for English
    learning_language: "es", // 'es' for Spanish
    bio: 'Passionate about technology and reading books.'
  },
  { 
    first_name: 'Charlie', 
    last_name: 'Smith', 
    email: 'charlie@example.com', 
    password: 'password123', 
    birthday: '1995-07-10', 
    native_language: "en",  // 'en' for English
    learning_language: "fr", // 'fr' for French
    bio: 'Avid gamer and software developer.'
  },
  { 
    first_name: 'David', 
    last_name: 'Johnson', 
    email: 'david@example.com', 
    password: 'password123', 
    birthday: '1992-03-30', 
    native_language: "es",  // 'es' for Spanish
    learning_language: "de", // 'de' for German
    bio: 'Music lover and tech enthusiast.'
  },
  { 
    first_name: 'Eva', 
    last_name: 'Wang', 
    email: 'eva@example.com', 
    password: 'password123', 
    birthday: '1999-11-05', 
    native_language: "it",  // 'it' for Italian
    learning_language: "en", // 'en' for English
    bio: 'Traveling the world and exploring new cultures.'
  }
];

// Helper function to hash passwords
async function hashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

async function populateDb() {
  try {
    await connectDB();

    // Hash all passwords before inserting into the database
    const hashedUsersData = await Promise.all(
      usersData.map(async (user) => ({
        ...user,
        password: await hashPassword(user.password),  // Hashing password here
      }))
    );

    // Insert users with hashed passwords
    const users = await User.insertMany(hashedUsersData);
    console.log('Utilisateurs créés avec succès:', users);

    const [alice, bob, charlie, david, eva] = users;

    const friendshipsData = [
      { user_id: alice._id, friend_id: bob._id, status: "accepted" },  // Friendship status: accepted
      { user_id: bob._id, friend_id: charlie._id, status: "isPending" },  // Friendship status: pending
      { user_id: charlie._id, friend_id: david._id, status: "accepted" },  // Friendship status: accepted
      { user_id: david._id, friend_id: eva._id, status: "refused" },  // Friendship status: refused
      { user_id: eva._id, friend_id: alice._id, status: "accepted" },  // Friendship status: accepted
    ];

    // Insert friendships
    await Friendship.insertMany(friendshipsData);
    console.log('Relations d\'amitié insérées avec succès.');

  } catch (error) {
    console.error('Erreur lors de l\'insertion des données :', error);
  }
}

populateDb();
