import { validationResult, body, param } from "express-validator";
import axios from "axios";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

export const paramLinkValidator = [
  param("id", "Formato no valido (expressValidator)")
  .trim()
  .notEmpty()
  .escape(),
  validationResultExpress,
]

export const bodyLinkValidator = [
  body("longLink", "El formato del link no es valido")
  .trim()
  .notEmpty()
  .custom(async (value) => {
    try {
      if(!value.startsWith("https://")){
        value = "https://" + value;
      }
      await axios.get(value);
      return value;
    } catch (error) {
      // console.log(error);
      throw new Error("not found link 404");
    }
  }),
  validationResultExpress
];

export const bodyRegisterValidator = [
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
    }),
    validationResultExpress
  ];

  export const bodyLoginValidator = [
    body('email', 'Formato de email incorrecto')
    .trim()
    .isEmail()
    .normalizeEmail(),
    body('password', 'Contraseña minimo 6 caracteres')
    .trim()
    .isLength({min: 6}),
    validationResultExpress,
];