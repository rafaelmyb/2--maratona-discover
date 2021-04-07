const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  create(req, res) {
    return res.render("job");
  },

  async save(req, res) {
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(), // atribuindo a data de hoje
    })

    return res.redirect("/");
  },

  async show(req, res) {
    // pega dos parametros http, o id do projeto
    const jobId = req.params.id;
    const jobs = await Job.get()

    // find verifica se o id do job é igual ao id do jobId, se for true, coloca no const job, se não, continua procurando no array Job.data e se não achar, retorna vazio
    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    // se não existir o id requisitado, retorna um job not found
    if (!job) {
      return res.send("Job not found!");
    }

    const profile = await Profile.get()

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },

  async update(req, res) {
    // id do url
    const jobId = req.params.id;
    
    const updatedJob = {
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
      // possível update: se o usuário não preencher algum campo, irá subscrever como valor nulo e portanto alterar toda conta do projeto. Para solucionar isso, basta tratar o erro. Se ele não preencher, não altera o projeto.
    };

    await Job.update(updatedJob, jobId)

    res.redirect("/job/" + jobId);
  },

  delete(req, res) {
    const jobId = req.params.id;

    Job.delete(jobId)

    return res.redirect("/");
  },
};
