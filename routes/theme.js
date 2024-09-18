var express = require("express");
var router = express.Router();

const modelList = require("./../schemas/list");
const utilsHelper = require("./../helper/utils");

/* GET home page. */
router.get("/login", function (req, res, next) {
  res.render("../views/page/login");
});

router.get("/dashboard", function (req, res, next) {
  res.render("../views/page/dashboard", { path: req.route.path });
});

router.get("/list-book(/:status)?", async function (req, res, next) {
  const currentStatus = utilsHelper.getParam(req.params, "status", "all");
  const keyWord = utilsHelper.getParam(req.query, "search", "");
  let objQuery = {};
  let formattedKeyWord = keyWord?.replace(/\s/g, "");
  const statusFilter = await utilsHelper.filterStatus(currentStatus, keyWord);
  if (currentStatus === "all" || !currentStatus) {
    objQuery = !keyWord ? {} : { name: new RegExp(`${formattedKeyWord}`, "i") };
  } else {
    objQuery = {
      status: currentStatus,
      name: new RegExp(`${formattedKeyWord}`, "i"),
    };
  }
  const list = await modelList.find(objQuery);

  res.render("../views/page/list-book", {
    path: req.route.path,
    list,
    statusFilter,
    currentStatus,
    keyWord,
  });
});

router.get("/form", function (req, res, next) {
  res.render("../views/page/form", { path: req.route.path });
});

module.exports = router;
