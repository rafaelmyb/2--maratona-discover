<<<<<<< HEAD
const Database = require("../db/config");

module.exports = {
  // retorna os dados para o controller mostrar no views
  async get() {
    const db = await Database();

    const data = await db.get(`SELECT * FROM profile`);

    await db.close();

    return {
      name: data.name,
      avatar: data.avatar,
      "monthly-budget": data.monthly_budget,
      "days-per-week": data.days_per_week,
      "hours-per-day": data.hours_per_day,
      "vacation-per-year": data.vacation_per_year,
      "value-hour": data.value_hour,
    };
  },
  // atualiza o profile com os novos dados que o controller mandou
  async update(newData) {
    const db = await Database()

    db.run(`UPDATE profile SET
    name = "${newData.name}",
    avatar = "${newData.avatar}",
    monthly_budget = ${newData["monthly-budget"]},
    days_per_week = ${newData["days-per-week"]},
    hours_per_day = ${newData["hours-per-day"]},
    vacation_per_year = ${newData["vacation-per-year"]},
    value_hour = ${newData["value-hour"]}
    `)

    await db.close()
  }
}; 
=======
let data = {
  name: "Rafael Yamada",
  avatar: "https://github.com/rafaelmyb.png",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4,
  "value-hour": 75,
};

module.exports = {
  // retorna os dados para o controller mostrar no views
  get() {
    return data;
  },
  // atualiza o profile com os novos dados que o controller mandou
  update(newData) {
    data = newData;
  },
};
>>>>>>> 21872c036ecb29140075bb0efc6796ee3c01655f
