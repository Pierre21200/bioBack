const express = require("express");
const router = express.Router();

const infosCtrl = require("../controllers/infos");
const multer = require("../middleware/multer-config.js");
const auth = require("../middleware/auth");

router.post("/dates", infosCtrl.createDate);
router.put("/dates", infosCtrl.putDates);
router.get("/dates", infosCtrl.getAllDates);
router.delete("/dates", infosCtrl.deleteDate);

router.post("/bioinfos", infosCtrl.createBioInfos);
router.get("/bioinfos", auth, infosCtrl.getAllBioInfos);
router.put("/bioinfos", auth, infosCtrl.putInfos);
router.delete("/bioinfos", auth, infosCtrl.deleteInfo);

router.post("/cominfos", multer, infosCtrl.createComInfos);
router.get("/cominfos", auth, infosCtrl.getAllComInfos);
router.put("/cominfos", auth, infosCtrl.putInfos);
router.delete("/cominfos", auth, infosCtrl.deleteInfo);

router.post("/recinfos", multer, infosCtrl.createRecInfos);
router.get("/recinfos", auth, infosCtrl.getAllRecInfos);
router.put("/recinfos", auth, infosCtrl.putInfos);
router.delete("/recinfos", auth, infosCtrl.deleteInfo);

router.post("/orainfos", multer, infosCtrl.createOraInfos);
router.get("/orainfos", auth, infosCtrl.getAllOraInfos);
router.put("/orainfos", auth, infosCtrl.putInfos);
router.delete("/orainfos", auth, infosCtrl.deleteInfo);

router.post("/signup", infosCtrl.signup);
router.post("/login", infosCtrl.login);

module.exports = router;
