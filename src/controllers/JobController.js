const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  create(req, res) {
    return res.render("job");
  },

  save(req, res) {

    const jobs = Job.get()
    // req.body = { name: , "daily-hours": , "total-hours": }
    const lastId = jobs[jobs.length - 1]?.id || 0;

    jobs.push({
      id: lastId + 1,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(), // atribuindo a data de hoje
    });

    return res.redirect("/");
  },

  show(req, res) {
    // pega dos parametros http, o id do projeto
    const jobId = req.params.id;
    const jobs = Job.get()

    // find verifica se o id do job é igual ao id do jobId, se for true, coloca no const job, se não, continua procurando no array Job.data e se não achar, retorna vazio
    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    // se não existir o id requisitado, retorna um job not found
    if (!job) {
      return res.send("Job not found!");
    }

    const profile = Profile.get()

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },

  update(req, res) {
    // id do url
    const jobId = req.params.id;
    const jobs = Job.get()

    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send("Job not found!");
    }

    const updateJob = {
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
      // possível update: se o usuário não preencher algum campo, irá subscrever como valor nulo e portanto alterar toda conta do projeto. Para solucionar isso, basta tratar o erro. Se ele não preencher, não altera o projeto.
    };

    // Somente se o id do job passado na função, for o id que eu alterei, vai me retornar um novo objeto pro Job.data
    const newJobs = jobs.map((job) => {
      if (Number(job.id) === Number(jobId)) {
        job = updateJob;
      }

      return job;
    });

    Job.update(newJobs)

    res.redirect("/job/" + jobId);
  },

  delete(req, res) {
    const jobId = req.params.id;

    Job.delete(jobId)

    return res.redirect("/");
  },
};
