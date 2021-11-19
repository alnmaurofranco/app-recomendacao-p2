const knex = require("../database");

module.exports = {
  async create(req, res) {
    try {
      const { topic, message } = req.body;

      const [{ id, createdAt }] = await knex("recommendation")
        .insert({
          topic,
          message,
        })
        .returning("*");

      return res.status(201).json({
        id,
        createdAt,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const results = await knex("recommendation").orderBy("createdAt", "desc");

      return res.status(200).json(results);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
