module.exports = {
  remainingDays(job) {
    // calculo de tempo restante
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed(); //.toFixed() arredonda pra cima ou pra baixo

    // adiciona os dias restantes à data de criação
    const createdDate = new Date(job.created_at);

    // Pega a data de criação e soma com a quantidade de dias que faltam (data futura)
    const dueDay = createdDate.getDate() + Number(remainingDays);

    // Cria data de vencimento
    const dueDateInMs = createdDate.setDate(dueDay);

    // Faz a diferença do tempo que vai vencer - o tempo de agora
    const timeDiffInMs = dueDateInMs - Date.now();

    //transformar millisegundos em dias
    const dayInMs = 1000 * 60 * 60 * 24;
    const dayDiff = Math.ceil(timeDiffInMs / dayInMs);

    // restam x dias
    return dayDiff;
  },
  
  calculateBudget: (job, valueHour) => valueHour * job["total-hours"],
};
