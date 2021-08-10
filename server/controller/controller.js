var Userdb = require("../model/model");

// create and save new user
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return null;
  }

  // New user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // save user in database
  user
    .save(user)
    .then((data) => res.redirect("/"))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// reterieve and return all users || retrive and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    Userdb.findById(req.query.id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found with that id" });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    Userdb.find()
      .then((users) => res.send(users))
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};

// Update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content can not b empty" });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe user not found`,
        });
      } else {
        console.log("updated");
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Error Update user information" });
    });
};

// Delete a user with specified user id
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}.Maybe id is wrong` });
      } else {
        res.send({ message: "User was deleted successfully!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: `Could delete ${id}` });
    });
};
