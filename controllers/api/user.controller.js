const Validator = require('fastest-validator');
const { user } = require('./../../models');
const v = new Validator();
var bcrypt = require('bcryptjs');

module.exports = {
  index: async (req, res) => {
    try{
      const response = await user.findAll({
          attributes: ['id', 'name', 'email', 'created_at', 'updated_at']
      });
      return res.status(200).json(response);
    }catch(err){
      return res.status(500).json({message: err.message});
    }
  },

  store: async (req, res) => {
    try{
      const schema = {
          name: 'string',
          email: 'email',
          password: 'string',
      }

      const validate = v.validate(req.body, schema);

      if(validate.length){
          return res
              .status(400)
              .json(validate);
      }

      await user.create({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
      });

      return res.status(201).json({message: 'Data was inserted!'});
    }catch(err){
      return res.status(500).json({message: err.message});
    }
  },

  show: async (req, res) => {
    try{
      const id = req.params.id;
      const response = await user.findByPk(id, {
          attributes: ['id', 'name', 'email', 'created_at', 'updated_at']
      });

      return res.status(200).json(response || {});
    }catch(err){
      return res.status(500).json({message: err.message});
    }
  },

  update: async (req, res) => {
    try{
      const id = req.params.id;

      let data = await user.findByPk(id, {
          attributes: ['id', 'name', 'email', 'created_at', 'updated_at']
      });

      if(!data){
          return res.json({message: "Data not found!"});
      }

      const schema = {
          name: 'string|optional',
          email: 'email|optional',
          password: 'string|optional',
      }

      const validate = v.validate(req.body, schema);

      if(validate.length){
          return res
              .status(400)
              .json(validate);
      }

      const response = await data.update({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
      });

      return res.status(200).json(response);
    }catch(err){
      return res.status(500).json({message: err.message});
    }
  },

  destroy: async (req, res) => {
    try{
      const id = req.params.id;
      let data = await user.findByPk(id);

      if(!data){
          return res.json({message: "Data not found!"});
      }

      await data.destroy(id);

      return res.status(200).json({message: "Data was deleted!"});
    }catch(err){
      return res.status(500).json({message: err.message});
    }
  }
}