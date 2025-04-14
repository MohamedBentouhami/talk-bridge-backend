import connectDB from '../repositories';
import User from '../models/user.model';
import Friendship from '../models/friendship.model';
import argon2 from 'argon2';
import Message from '../models/message.model';

const usersData = [
  { first_name: 'Alice', last_name: 'Dupont', email: 'alice@example.com', password: 'password123', birthday: '1998-01-15', native_language: "fr", learning_language: "en", bio: 'I love traveling and learning new languages.', profile_pict: "girl-profile.jpg" },
  { first_name: 'Bob', last_name: 'Martin', email: 'bob@example.com', password: 'password123', birthday: '1990-05-22', native_language: "en", learning_language: "es", bio: 'Passionate about technology and reading books.', profile_pict: "boy-profile.jpg" },
  { first_name: 'Charlie', last_name: 'Smith', email: 'charlie@example.com', password: 'password123', birthday: '1995-07-10', native_language: "en", learning_language: "fr", bio: 'Avid gamer and software developer.', profile_pict: "boy-profile.jpg" },
  { first_name: 'David', last_name: 'Johnson', email: 'david@example.com', password: 'password123', birthday: '1992-03-30', native_language: "es", learning_language: "de", bio: 'Music lover and tech enthusiast.', profile_pict: "boy-profile.jpg" },
  { first_name: 'Eva', last_name: 'Wang', email: 'eva@example.com', password: 'password123', birthday: '1999-11-05', native_language: "it", learning_language: "en", bio: 'Traveling the world and exploring new cultures.', profile_pict: "girl-profile.jpg" },
  { first_name: 'Fatima', last_name: 'El Idrissi', email: 'fatima@example.com', password: 'password123', birthday: '1996-08-12', native_language: "ar", learning_language: "fr", bio: 'Amoureuse de la poésie et des langues.', profile_pict: "boy-profile.jpg" },
  { first_name: 'Lucas', last_name: 'Moreau', email: 'lucas@example.com', password: 'password123', birthday: '1993-02-18', native_language: "fr", learning_language: "en", bio: 'Sportif et curieux des cultures du monde.', profile_pict: "boy-profile.jpg" },
  { first_name: 'Yuki', last_name: 'Takahashi', email: 'yuki@example.com', password: 'password123', birthday: '2000-06-30', native_language: "ja", learning_language: "en", bio: 'Jadore les films et les livres occidentaux.', profile_pict: "boy-profile.jpg" },
  { first_name: 'Carlos', last_name: 'Gomez', email: 'carlos@example.com', password: 'password123', birthday: '1989-10-09', native_language: "es", learning_language: "fr", bio: 'Fan de cuisine et de musique latine.', profile_pict: "boy-profile.jpg" },
  { first_name: 'Emma', last_name: 'Lemaire', email: 'emma@example.com', password: 'password123', birthday: '1997-12-25', native_language: "fr", learning_language: "en", bio: 'Toujours prête à discuter et à découvrir.', profile_pict: "girl-profile.jpg" },
  { first_name: 'Liam', last_name: "O'Connor", email: 'liam@example.com', password: 'password123', birthday: '1994-09-17', native_language: "en", learning_language: "fr", bio: 'Adventure seeker and photographer.', profile_pict: "boy-profile.jpg" },
  { first_name: 'Sofia', last_name: 'Rodriguez', email: 'sofia@example.com', password: 'password123', birthday: '1996-11-22', native_language: "es", learning_language: "it", bio: 'Art lover and foodie.', profile_pict: "girl-profile.jpg" },
  { first_name: 'Mohamed', last_name: 'Ben Ali', email: 'mohamed@example.com', password: 'password123', birthday: '2001-02-28', native_language: "ar", learning_language: "en", bio: 'Football fan and aspiring entrepreneur.', profile_pict: "boy-profile.jpg" },
  { first_name: 'Lena', last_name: 'Schmidt', email: 'lena@example.com', password: 'password123', birthday: '1995-06-14', native_language: "de", learning_language: "en", bio: 'Fashion enthusiast and travel blogger.', profile_pict: "girl-profile.jpg" },
  { first_name: 'John', last_name: 'Doe', email: 'john@example.com', password: 'password123', birthday: '1985-04-05', native_language: "en", learning_language: "fr", bio: 'Always seeking new challenges and opportunities.', profile_pict: "boy-profile.jpg" },
  { first_name: 'Mia', last_name: 'Kumar', email: 'mia@example.com', password: 'password123', birthday: '1997-10-21', native_language: "fr", learning_language: "en", bio: 'Technology and science enthusiast.', profile_pict: "girl-profile.jpg" },
  { first_name: 'Douaa', last_name: 'Vampire', email: 'douaa@example.com', password: 'password123', birthday: '2003-09-25', native_language: "ar", learning_language: "fr", bio: 'Technology and science enthusiast.', profile_pict: "girl-profile.jpg" }
];


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

    const [
      alice, bob, charlie, david, eva, fatima, lucas, yuki, carlos, emma,
      liam, sofia, mohamed, lena, john, mia
    ] = users;
    const friendshipsData = [
      { user_id: alice._id, friend_id: bob._id, status: "accepted" },
      { user_id: bob._id, friend_id: alice._id, status: "accepted" },
      { user_id: bob._id, friend_id: charlie._id, status: "isPending" },
      { user_id: charlie._id, friend_id: david._id, status: "accepted" },
      { user_id: david._id, friend_id: charlie._id, status: "accepted" },
      { user_id: david._id, friend_id: eva._id, status: "refused" },
      { user_id: eva._id, friend_id: alice._id, status: "accepted" },
      { user_id: alice._id, friend_id: eva._id, status: "accepted" },

      { user_id: bob._id, friend_id: eva._id, status: "isPending" },
      { user_id: eva._id, friend_id: bob._id, status: "isPending" },
      { user_id: alice._id, friend_id: lucas._id, status: "isPending" },
      { user_id: lucas._id, friend_id: alice._id, status: "isPending" },
      { user_id: charlie._id, friend_id: fatima._id, status: "isPending" },
      { user_id: fatima._id, friend_id: charlie._id, status: "isPending" },
      { user_id: lucas._id, friend_id: david._id, status: "isPending" },
      { user_id: david._id, friend_id: lucas._id, status: "isPending" },
      { user_id: fatima._id, friend_id: yuki._id, status: "isPending" },
      { user_id: yuki._id, friend_id: fatima._id, status: "isPending" },
      { user_id: sofia._id, friend_id: mia._id, status: "isPending" },
      { user_id: mia._id, friend_id: sofia._id, status: "isPending" },
      { user_id: john._id, friend_id: liam._id, status: "isPending" },
      { user_id: liam._id, friend_id: john._id, status: "isPending" },
      { user_id: lena._id, friend_id: sofia._id, status: "isPending" },
      { user_id: sofia._id, friend_id: lena._id, status: "isPending" }
    ];

    await Friendship.insertMany(friendshipsData);
    console.log('Relations d\'amitié insérées avec succès.');

    const messagesData = [
      {
        sender_id: alice._id,
        receiver_id: bob._id,
        content: "Hi Bob! How's your Spanish learning going?",
        timestamp: new Date(),
      },
      {
        sender_id: bob._id,
        receiver_id: alice._id,
        content: "Hey Alice! Pretty good, just started watching a Spanish series. And you?",
        timestamp: new Date(),
      },
      {
        sender_id: eva._id,
        receiver_id: alice._id,
        content: "Salut Alice ! Tu veux pratiquer ton anglais ensemble ? 😊",
        timestamp: new Date(),
      },
      {
        sender_id: alice._id,
        receiver_id: eva._id,
        content: "Avec plaisir Eva ! On peut faire ça tous les soirs si tu veux !",
        timestamp: new Date(),
      },
      {
        sender_id: charlie._id,
        receiver_id: david._id,
        content: "Yo David! Do you have any good German learning tips?",
        timestamp: new Date(),
      },
      {
        sender_id: david._id,
        receiver_id: charlie._id,
        content: "Sure! I use Duolingo and I watch German YouTubers. Want some links?",
        timestamp: new Date(),
      },
      {
        sender_id: fatima._id,
        receiver_id: yuki._id,
        content: "Hey Yuki, I'd love to learn more about Japanese culture! Can you help?",
        timestamp: new Date(),
      },
      {
        sender_id: yuki._id,
        receiver_id: fatima._id,
        content: "Of course, Fatima! Let's do a culture exchange. You teach me French, I teach you Japanese?",
        timestamp: new Date(),
      },
      {
        sender_id: sofia._id,
        receiver_id: mia._id,
        content: "Ciao Mia! Ho visto che stai imparando l'italiano. Posso aiutarti se vuoi 😊",
        timestamp: new Date(),
      },
      {
        sender_id: mia._id,
        receiver_id: sofia._id,
        content: "Grazie Sofia! That would be awesome. Let's set up a video call?",
        timestamp: new Date(),
      },
      {
        sender_id: mohamed._id,
        receiver_id: bob._id,
        content: "Hi Bob, I saw you're into tech! Want to talk about new gadgets sometime?",
        timestamp: new Date(),
      },
      {
        sender_id: bob._id,
        receiver_id: mohamed._id,
        content: "Sure thing Mohamed! I'm always up for a tech chat.",
        timestamp: new Date(),
      },
    ];
    
    await Message.insertMany(messagesData);
    console.log('Messages insérés avec succès.');
    
  } catch (error) {
    console.error('Erreur lors de l\'insertion des données :', error);
  }
}

populateDb();
