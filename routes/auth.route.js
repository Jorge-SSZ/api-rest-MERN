import { Router } from 'express';
import { login, register } from "../controllers/auth.controller.js";
import { body } from 'express-validator';
import { validationResultExpress } from "../middlewares/ValidationResultExpress.js";


const router = Router();

router.post('/register', 
[
  body('email', 'Formato de email incorrecto')
  .trim()
  .isEmail()
  .normalizeEmail(),
  body('password', 'Contraseña minimo 6 caracteres')
  .trim()
  .isLength({min: 6}),
  body('repassword', 'Formato de password incorrecto').custom((value, {req}) => {
    if(value !== req.body.password) {
      throw new Error('No coinciden las contraseñas')
    }
    return value;
  })
], validationResultExpress,
 register);

router.post(
  '/login',
  [
  body('email', 'Formato de email incorrecto')
  .trim()
  .isEmail()
  .normalizeEmail(),
  body('password', 'Contraseña minimo 6 caracteres')
  .trim()
  .isLength({min: 6}),], 
    validationResultExpress,
   login)


export default router;

