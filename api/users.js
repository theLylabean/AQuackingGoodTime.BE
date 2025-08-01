import express from 'express';
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  newUsernameCheck,
  newEmailCheck,
  getLogin
} from '../db/queries/usersqueries.js';
import { verifyToken } from '../middleware.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from '../db/client.js';

console.log("✅ users.js loaded");

const router = express.Router();
const SECRET = process.env.JWT_SECRET;

router.post('/register', async( req, res, next ) => {
  console.log("🔥 Register route hit");
  res.send("Register route reached");
    try {
        const { first_name, last_name, email, username, password } = req.body;
        if ( !username || !password ) {
            return res.status(400).json({ message: 'Username and password required' });
        }
        const existingUsername = await newUsernameCheck(username);
        const existingEmail = await newEmailCheck(email);
        if (existingUsername) {
        return res.status(409).json({ message: 'Username already exists.' });
        }
        if (existingEmail) {
        return res.status(409).json({ message: 'Email already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(first_name, last_name, email, username, hashedPassword);
        const token = jwt.sign(
            { id: newUser.id, username: newUser.username }, SECRET 
        );
        res.status(201).json({
            token,
            user:
            { id: newUser.id, username: newUser.username, email: newUser.email }
        })
    } catch (error) {
        console.error('❌ Registration error:', error.message);
        res.status(500).json({ message: 'Failed to register new User' });
    }
});


router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        if (!username || !password ) {
            return res.status(400).json({ message: 'Username and password required.' });
        }
        const userLogin = await getLogin(username);
        const user = userLogin.rows[0];
        if ( !user ) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isPWMatch = await bcrypt.compare(password, user.password);
        if ( !isPWMatch ) {
            return res.status(401).json({ message: 'Incorrect password. Please try again.' })
        }
        const SECRET = process.env.JWT_SECRET;
        if (!SECRET) {
            return res.status(500).json({ message: 'JWT secret is missing on server.' });
        }
        const token = jwt.sign(
            { id: user.id, username: user.username }, SECRET
        );
        res.json({
            token,
            user:
            { id: user.id, username: user.username }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to login user. Please try again.'})
    }
});

router.put('/:id', verifyToken, async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await updateUser(req.params.id, username, hashedPassword);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', verifyToken, async (req, res, next) => {
  try {
    const deletedUser = await deleteUser(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
});

router.get('/reviews', verifyToken, async (req, res, next) => {
  const id = Number(req.user.id)
  try {
    const review = await db.query(`SELECT * FROM reviews WHERE user_id = $1;`, [id])
    res.status(201).json(review.rows)
  } catch (error) {

  }
});

router.post('/addtocart', verifyToken, async (req, res) => {
    const { productId } = req.body;
    const userId = req.user?.id;

    try {
        if (!productId || !userId) {
            return res.status(400).json({ error: "Missing productId or userId" });
        }

        // Insert into carts table
        await db.query(`
            INSERT INTO carts (user_id, product_id)
            VALUES ($1, $2)
        `, [userId, productId]);

        // Return full product info
        const result = await db.query(`
            SELECT p.*, 1 AS quantity
            FROM products p
            WHERE p.id = $1
        `, [productId]);

        const product = result.rows[0];
        product.price = parseFloat(product.price); // make sure price is a number

        res.status(201).json(product);
    } catch (err) {
        console.error("Error adding to cart:", err);
        res.status(500).json({ error: "Failed to add to cart" });
    }
});

router.get('/:id', verifyToken, async (req, res, next) => {
  try {
    const user = await getUserById(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});


export default router;
