var User = require("../../../../dist/express-server/mongomodels/user").User;

const getUsers = (req, res) => {
  User.find({}, (error, users) => {
    if (error) {
      console.error("Error", error);
    }

    res.json(users);
  });
};

const createUser = (req, res) => {
  const { username, email, password, } = req.swagger.params.body.value;

  User.create({username, email, password, }, (error, user) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(user);
  });
};

const deleteUser = (req, res) => {
  const id = req.swagger.params.id.value;

  User.findOneAndDelete({_id: id, }, (error, user) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(user);
  });
};

module.exports = {
  getUsers: getUsers,
  createUser: createUser,
  deleteUser: deleteUser
}
