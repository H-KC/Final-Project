const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  stepsID: {
    type: String,
    required: true,
    unique: true,
  },
  waterTower: {
    type: String,
    require: true,
  },
  step1: {
    title: {
      type: String,
      required: true,
      default: "réalisation du plan",
    },
    state: {
      type: String,
      required: true,
      default: "now",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  step2: {
    title: {
      type: String,
      required: true,
      default: "création des Fouilles et coulage des fondations",
    },
    state: {
      type: String,
      required: true,
      default: "new",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  step3: {
    title: {
      type: String,
      required: true,
      default: "mise en place des ferraillages",
    },
    state: {
      type: String,
      required: true,
      default: "new",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  step4: {
    title: {
      type: String,
      required: true,
      default: "coffrage des poteaux et des plates-formes",
    },
    state: {
      type: String,
      required: true,
      default: "new",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  step5: {
    title: {
      type: String,
      required: true,
      default: "mise en place de pompe",
    },
    state: {
      type: String,
      required: true,
      default: "new",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  step6: {
    title: {
      type: String,
      required: true,
      default: "création du radier et fut circulaire",
    },
    state: {
      type: String,
      required: true,
      default: "new",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  step7: {
    title: {
      type: String,
      required: true,
      default: "installaion de Panneaux solaires",
    },
    state: {
      type: String,
      required: true,
      default: "new",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  step8: {
    title: {
      type: String,
      required: true,
      default: "second oeuvre et finitions",
    },
    state: {
      type: String,
      required: true,
      default: "new",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  step9: {
    title: {
      type: String,
      required: true,
      default: "Livraison des travaux",
    },
    state: {
      type: String,
      required: true,
      default: "new",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("waterTowerStep", userSchema);
