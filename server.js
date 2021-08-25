const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

try {
  mongoose.connect(process.env.DATABASE_LOCAL, {}).then((con) => {
    // console.log(con.connections);
    console.log('DB Connection Successfull');
  });
} catch (e) {
  console.log(' ', e);
}

const port = process.env.PORT || 4001;
const server = app.listen(port, () => {
  console.log(`App Running on port ${port}..`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNCAUGHT EXCEPTION ! shutting down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// console.log(x);

// Hello Vipul sir and Parita
// Task Updated

// Task : NodeJS Tutorials
// Status: Ongoing
// Note: Completed:
// 1. what is multer
// 2. what is sharp package
// 3. what is stripe

// Task : NodeJS Tutorials Videos
// Status: Ongoing
// Note: Completed:
// SECTION:13 Advanced Features: Payments, Email, File Uploads
// 197. Section Intro
// 198. Image Uploads Using Multer: Users
// 199. Configuring Multer
// 200. Saving Image Name to Database
// 201. Resizing Images
// 202. Adding Image Uploads to Form
// 203. Uploading Multiple Images: Tours
// 204. Processing Multiple Images
// 205. Building a Complex Email Handler
// 206. Email Templates with Pug: Welcome Emails
// 207. Sending Password Reset Emails
// 208. Using Sendgrid for "Real" Emails(Only Review)
// 209. Credit Card Payments with Stripe
// 210. Creating Our Base Template
// 178. Including Files into Pug Templates
// 179. Extending Our Base Template with Blocks
// 180. Setting up the Project Structure
