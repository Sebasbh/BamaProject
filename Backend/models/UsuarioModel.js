import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import passwordValidator from 'password-validator';

var schema = new passwordValidator();
schema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits(2)
  .has().not().spaces()
  .is().not().oneOf(['Passw0rd', 'Password123']);

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

