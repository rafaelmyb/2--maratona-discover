const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
<<<<<<< HEAD
  async index(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();
=======
  index(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();
>>>>>>> 21872c036ecb29140075bb0efc6796ee3c01655f

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    // total de horas por dia de cada Job em progress
    let jobTotalHours = 0;

    const updatedJobs = jobs.map((job) => {
      // ajustes no job
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      // Somando a quantidade de status
      // status = progress
      // statusCount[progress] += 1
      statusCount[status] += 1;

      // total de horas por dia de cada Job em progress
      jobTotalHours = status == 'progress' ? jobTotalHours =+ Number(job["daily-hours"]) : jobTotalHours

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    // qtd de horas que quero trabalhar dia (PROFILE)
    // MENOS
    // qtd de horas/dia de cada job em progress
    const freeHours = profile["hours-per-day"] - jobTotalHours;

    return res.render("index", {
      jobs: updatedJobs,
      profile: profile,
      statusCount: statusCount,
      freeHours: freeHours,
    });
  },
};
