exports.seed = function (knex) {
  return knex("recommendation")
    .del()
    .then(function () {
      return knex("recommendation").insert([
        { topic: "COVID-19", message: "Use máscara " },
        { topic: "COVID-19", message: "Higienize bem as mãos" },
        { topic: "COVID-19", message: "Fique em casa" },
      ]);
    });
};
