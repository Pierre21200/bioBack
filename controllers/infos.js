const BioInfos = require("../models/bioInfos");
const CommInfos = require("../models/commInfos");
const OraInfos = require("../models/orainfos");
const RecInfos = require("../models/recinfos");
const User = require("../models/user");
const Mydate = require("../models/date");
const Admindate = require("../models/adminDate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

function convertDate(dateString) {
  const daysOfWeek = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const monthsOfYear = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const date = new Date(dateString);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = ("0" + date.getDate()).slice(-2);
  const monthOfYear = monthsOfYear[date.getMonth()];
  const year = date.getFullYear();
  return `${dayOfWeek} ${dayOfMonth} ${monthOfYear} ${year}`;
}

// POST CONTROLLER
exports.createDate = (req, res, next) => {
  console.log(req.body);
  var dateObject;
  var free = null;

  if (req.body.cancelled === false) {
    console.log("cancell");
    var dateObject = req.body.changingDay.date;
    var free = false;
  } else if (req.body.released === true) {
    console.log("release");

    var dateObject = req.body.changingDay.date;
    var free = true;
  } else {
    var dateObject = req.body.date;
  }

  const date = new Date(dateObject).toString();

  const newDate = new Mydate({
    date,
    free,
  });

  newDate
    .save()
    .then(() => {
      res.status(201).json({ message: " Date enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.createAdminDate = (req, res, next) => {
  const dateObject = req.body.day.date;
  const date = new Date(dateObject).toString();
  const newDate = new Admindate({
    date,
  });

  newDate
    .save()
    .then(() => {
      res.status(201).json({ message: " Date enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.createBioInfos = (req, res, next) => {
  console.error("bio");
  const infosObject = req.body;
  const infos = new BioInfos({
    ...infosObject,
  });

  infos
    .save()
    .then(() => {
      res.status(201).json({ message: "Infos enregistrées !" + infos });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.createComInfos = (req, res, next) => {
  let imageUrl;
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }

  const infosObject = req.body;
  const infos = new CommInfos({
    ...infosObject,
    imageUrl: imageUrl,
  });

  infos
    .save()
    .then(() => res.status(201).json({ message: "Infos saved oui!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.createRecInfos = (req, res, next) => {
  let imageUrl;
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }

  const infosObject = req.body;
  const infos = new RecInfos({
    ...infosObject,
    imageUrl: imageUrl,
  });

  infos
    .save()
    .then(() => res.status(201).json({ message: "Infos saved successfully!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.createOraInfos = (req, res, next) => {
  let imageUrl;
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }

  const infosObject = req.body;
  const infos = new OraInfos({
    ...infosObject,
    imageUrl: imageUrl,
  });

  infos
    .save()
    .then(() => res.status(201).json({ message: "Infos saved successfully!" }))
    .catch((error) => res.status(400).json({ error }));
};

// GET CONTROLLER
exports.getAllDates = (req, res, next) => {
  Mydate.find()
    .then((dates) => {
      res.status(200).json(dates);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllAdminDates = (req, res, next) => {
  Admindate.find()
    .then((dates) => {
      res.status(200).json(dates);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllBioInfos = (req, res, next) => {
  BioInfos.find()
    .then((infos) => {
      res.status(200).json(infos);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllComInfos = (req, res, next) => {
  CommInfos.find()
    .then((infos) => {
      res.status(200).json(infos);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllRecInfos = (req, res, next) => {
  RecInfos.find()
    .then((infos) => {
      res.status(200).json(infos);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllOraInfos = (req, res, next) => {
  OraInfos.find()
    .then((infos) => {
      res.status(200).json(infos);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// PUT Controller
exports.putInfos = (req, res, next) => {
  const clientId = req.body.id;
  const rdv = req.body.rdv;
  const pay = req.body.pay;
  const pastAppointment = req.body.pastAppointment;
  const category = req.body.category;
  let InfoModel;

  if (category === "bio") {
    InfoModel = BioInfos;
  } else if (category === "com") {
    InfoModel = CommInfos;
  } else if (category === "rec") {
    InfoModel = RecInfos;
  } else if (category === "ora") {
    InfoModel = OraInfos;
  }

  InfoModel.findById(clientId)
    .then((infos) => {
      if (!infos) {
        return res.status(404).json({ message: "Infos non trouvées" });
      }

      if (rdv && infos) {
        infos.confirmed = !infos.confirmed;

        infos
          .save()
          .then(() => {
            res.status(200).json({ message: "Infos modifiées !" });
          })
          .catch((error) => {
            console.log(error); // Gestion d'erreur : affichage de l'erreur dans la console
            res.status(400).json({ error });
          });
      }

      if (pay && infos) {
        infos.confirmedPaiement = !infos.confirmedPaiement;

        infos
          .save()
          .then(() => {
            res.status(200).json({ message: "Infos modifiées !" });
          })
          .catch((error) => {
            console.log(error); // Gestion d'erreur : affichage de l'erreur dans la console
            res.status(400).json({ error });
          });
      }

      if (pastAppointment && infos) {
        infos.pastAppointment = !infos.pastAppointment;

        infos
          .save()
          .then(() => {
            res.status(200).json({ message: "Infos modifiées !" });
          })
          .catch((error) => {
            console.log(error); // Gestion d'erreur : affichage de l'erreur dans la console
            res.status(400).json({ error });
          });
      }

      // Enregistrement des modifications dans la base de données
    })
    .catch((error) => {
      console.log(error); // Gestion d'erreur : affichage de l'erreur dans la console
      res.status(500).json({ error });
    });
};

exports.deleteInfo = (req, res, next) => {
  const infoId = req.body.id;
  const category = req.body.category;
  let InfoModel;

  if (category === "bio") {
    InfoModel = BioInfos;
  } else if (category === "com") {
    InfoModel = CommInfos;
  } else if (category === "rec") {
    InfoModel = RecInfos;
  } else if (category === "ora") {
    InfoModel = OraInfos;
  }
  InfoModel.findByIdAndDelete(infoId).then((info) => {
    if (!info) {
      return res.status(404).json({
        message: "L'information avec cet identifiant n'existe pas.",
      });
    }

    res.status(200).json({
      message: "L'information a été supprimée avec succès.",
      info: info,
    });
  });
};

exports.putDates = async (req, res, next) => {
  const date = new Date(req.body.date);
  try {
    const updatedDate = await Mydate.findOne({ date: date });

    if (!updatedDate) {
      return res.status(404).json({
        error:
          "La date correspondante n'a pas été trouvée dans la base de données.",
      });
    }

    updatedDate.free = !updatedDate.free;
    await updatedDate.save(); // Sauvegarde de la modification dans la base de données

    res
      .status(200)
      .json({ message: "Mise à jour de la date réussie.", updatedDate });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de la date." });
  }
};

exports.deleteDate = (req, res, next) => {
  infoDate = convertDate(req.body.date);
  let matchFound = false;
  try {
    Mydate.find({}).then((infos) => {
      infos.map((info) => {
        if (!matchFound && infoDate === convertDate(info.date)) {
          matchFound = true;
          Mydate.findOneAndDelete({ _id: info._id }).then((info) =>
            console.log(info)
          );
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
};

exports.deleteAdminDate = (req, res, next) => {
  infoDate = convertDate(req.body.date);
  let matchFound = false;
  try {
    Admindate.find({}).then((infos) => {
      infos.map((info) => {
        if (!matchFound && infoDate === convertDate(info.date)) {
          matchFound = true;
          Admindate.findOneAndDelete({ _id: info._id }).then((info) =>
            console.log(info)
          );
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
};

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => {
          console.log(error);
          res.status(400).json({ error, message: "aie" });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("Utilisateur inexistant");
    }
    const compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare) {
      throw new Error("Mot de passe incorrect !");
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({ message: "Authentification réussie", token });
    // res.status(200).send({ message: "Authentification réussie" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
