import mongoose from 'mongoose';
import connectDB from '../repositories';
import User from '../models/user.model';
import Friendship from '../models/friendship.model';
import argon2 from 'argon2';

const profilePictures = ["boy-profile.jpg", "girl-profile.jpg", "profile.jpg"];

const usersData = [
  { first_name: 'Alice', last_name: 'Dupont', email: 'alice@example.com', password: 'password123', birthday: '1998-01-15', native_language: "fr", learning_language: "en", bio: 'I love traveling and learning new languages.' },
  { first_name: 'Bob', last_name: 'Martin', email: 'bob@example.com', password: 'password123', birthday: '1990-05-22', native_language: "en", learning_language: "es", bio: 'Passionate about technology and reading books.' },
  { first_name: 'Charlie', last_name: 'Smith', email: 'charlie@example.com', password: 'password123', birthday: '1995-07-10', native_language: "en", learning_language: "fr", bio: 'Avid gamer and software developer.' },
  { first_name: 'David', last_name: 'Johnson', email: 'david@example.com', password: 'password123', birthday: '1992-03-30', native_language: "es", learning_language: "de", bio: 'Music lover and tech enthusiast.' },
  { first_name: 'Eva', last_name: 'Wang', email: 'eva@example.com', password: 'password123', birthday: '1999-11-05', native_language: "it", learning_language: "en", bio: 'Traveling the world and exploring new cultures.' },
  { first_name: 'Fatima', last_name: 'El Idrissi', email: 'fatima@example.com', password: 'password123', birthday: '1996-08-12', native_language: "ar", learning_language: "fr", bio: 'Amoureuse de la poésie et des langues.' },
  { first_name: 'Lucas', last_name: 'Moreau', email: 'lucas@example.com', password: 'password123', birthday: '1993-02-18', native_language: "fr", learning_language: "en", bio: 'Sportif et curieux des cultures du monde.' },
  { first_name: 'Yuki', last_name: 'Takahashi', email: 'yuki@example.com', password: 'password123', birthday: '2000-06-30', native_language: "ja", learning_language: "en", bio: 'J’adore les films et les livres occidentaux.' },
  { first_name: 'Carlos', last_name: 'Gomez', email: 'carlos@example.com', password: 'password123', birthday: '1989-10-09', native_language: "es", learning_language: "fr", bio: 'Fan de cuisine et de musique latine.' },
  { first_name: 'Emma', last_name: 'Lemaire', email: 'emma@example.com', password: 'password123', birthday: '1997-12-25', native_language: "fr", learning_language: "en", bio: 'Toujours prête à discuter et à découvrir.' }
].map(user => ({
  ...user,
  profile_pict: profilePictures[Math.floor(Math.random() * profilePictures.length)]
}));

async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await argon2.hash(password);
  return hashedPassword;
}

async function populateDb() {
  try {
    await connectDB();

    const hashedUsersData = await Promise.all(
      usersData.map(async (user) => ({
        ...user,
        password: await hashPassword(user.password),
      }))
    );

    const users = await User.insertMany(hashedUsersData);
    console.log('Utilisateurs créés avec succès');

    const [alice, bob, charlie, david, eva] = users;

    const friendshipsData = [
      { user_id: alice._id, friend_id: bob._id, status: "accepted" },
      { user_id: bob._id, friend_id: alice._id, status: "accepted" },
      { user_id: bob._id, friend_id: charlie._id, status: "isPending" },
      { user_id: charlie._id, friend_id: david._id, status: "accepted" },
      { user_id: david._id, friend_id: charlie._id, status: "accepted" },
      { user_id: david._id, friend_id: eva._id, status: "refused" },
      { user_id: eva._id, friend_id: alice._id, status: "accepted" },
      { user_id: alice._id, friend_id: eva._id, status: "accepted" },
    ];

    await Friendship.insertMany(friendshipsData);
    console.log('Relations d\'amitié insérées avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'insertion des données :', error);
  }
}

populateDb();
