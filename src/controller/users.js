const { Users, Literatures, Collections } = require("../../models");

exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    let data = null;
    !id
      ? (data = await Users.findAll())
      : (data = await Users.findOne({
          where: {
            id,
          },
          // include: {
          //   model: Literatures,
          //   as: "collections_data",
          //   through: {
          //     model: Collections,
          //     as: "info",
          //     attributes: {
          //       include: ["id"],
          //       exclude: ["createdAt", "updatedAt"],
          //     },
          //   },
          //   include: {
          //     model: Users,
          //     as: "uploader",
          //     attributes: {
          //       exclude: ["createdAt", "updatedAt", "password"],
          //     },
          //   },
          //   attributes: {
          //     exclude: ["createdAt", "updatedAt", "info"],
          //   },
          // },
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        }));

    if (data !== null) {
      res.send({
        message: "Response Successfully",
        data,
      });
    } else {
      res.status(500).send({
        error: {
          message: "User Not Found",
        },
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Users.destroy({
      where: {
        id,
      },
    });

    if (deleted) {
      res.send({
        message: "Successfully Deleted",
        id,
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.patch_avatar = async (req, res) => {
  try {
    const id = req.params.id;
    const photoUrl = req.file.path;

    const patch = await Users.update(
      { photoUrl },
      {
        where: {
          id,
        },
      }
    );

    if (patch) {
      res.send({
        message: "Successfully change photo profile",
        data: {
          id,
          photoUrl,
        },
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.patch = async (req, res) => {
  try {
    const id = req.params.id;
    let updated = req.body;

    const patch = await Users.update(updated, {
      where: {
        id,
      },
    });

    if (patch) {
      res.send({
        message: "Successfully Updated",
        data: {
          id,
          updated,
        },
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};
