const { User } = require('../models/user');

module.exports = {
  getUsers: async () => {
    try {
      // console.log("hahahahahahah");
      const users = await User.findAll();
      // console.log(users);
      return users;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching users');
    }
  },
  getUserById: async (id) => {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      throw new Error('Error fetching user');
    }
  },
  createUser: async (name, email, age) => {
    try {
      const user = await User.create({ name, email, age });
      return user;
    } catch (error) {
      console.log(error.message);
      throw new Error('Error creating user');
    }
  },
  updateUser: async (id, name, email, age) => {
    try {
      const user = await User.update({ name, email, age }, { where: { id } });
      return user;
    } catch (error) {
      throw new Error('Error updating user');
    }
  },
  deleteUser: async (id) => {
    try {
      const user = await User.destroy({ where: { id } });
      return user;
    } catch (error) {
      throw new Error('Error deleting user');
    }
  },
};
