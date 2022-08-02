import jwt from 'jsonwebtoken';

const expiresIn = 60 * 15;

export const generateToken = (uid) => {
  try {
    const token = jwt.sign({uid}, process.env.JWT_SECRET, { expiresIn })
    return { token, expiresIn}
  } catch (error) {
    console.log(error);
  }
}