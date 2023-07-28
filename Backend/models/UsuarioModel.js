// UsuarioModel.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import passwordValidator from 'password-validator';

// Define a password schema
var schema = new passwordValidator();
schema
  .is().min(8) // Minimum length 8
  .is().max(100) // Maximum length 100
  .has().uppercase() // Must have uppercase letters
  .has().lowercase() // Must have lowercase letters
  .has().digits(2) // Must have at least 2 digits
  .has().not().spaces() // Should not have spaces
  .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    validate: [value => {
      return schema.validate(value);
    }, 'Invalid password']
  }
});

// Hash the password before saving the user model
usuarioSchema.pre('save', function (next) {
  const usuario = this;

  if (!usuario.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(usuario.password, salt, function (err, hash) {
      if (err) return next(err);

      usuario.password = hash;
      next();
    });
  });
});

const Usuario = mongoose.model('Usuario', usuarioSchema, 'usuarios');

export default Usuario;

