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
