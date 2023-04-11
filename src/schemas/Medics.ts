import joi from "joi";

const signUp = joi.object({
    name: joi.string().required(),
    cpf: joi.string().min(11).max(11).required(),
    address: joi.string().required(),
    specialization: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref("password")
  });
  

const login = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

const createAvaliable = joi.object({
  date: joi.string().required(),
  time: joi.string().required()
});

export default {
    signUp,
    login,
    createAvaliable
  };