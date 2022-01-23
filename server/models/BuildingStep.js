const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  stepsID: {
    type: String,
    required: true,
    unique: true,
  },
  building: {
    type: String,
    required: true,
  },
  step1: {
    title: {
      type: String,
      required: true,
      default: "Conception d'un Projet",
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
      default: "Permis de Construire",
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
      default: "Préparation et  Voirie  réseaux divers",
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
      default: "Fondations et GrOS gros oeuvre",
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
      default: "Le clos et le couvert",
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
      default: "La technique",
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
      default: "Second oeuvre et Finitions",
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
      default: "Livraison",
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

module.exports = mongoose.model("buildingStep", userSchema);
