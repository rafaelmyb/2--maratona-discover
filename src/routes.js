const express = require('express')
const routes = express.Router()

const views = __dirname + "/views/"

const Profile = {
    data: {
        name: "Rafael Yamada",
        avatar: "https://github.com/rafaelmyb.png",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 8,
        "vacation-per-year": 4,
        "value-hour": 75
    },
    
    controllers: {
        index(req, res) {
            return res.render(views + "profile", { profile: Profile.data })
        },

        update(req, res) {
            // req.body para pegar os dados
            const data = req.body

            // definir quantas semanas tem um ano: 52
            const weeksPerYear = 52
            
            // remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

            // total de horas trabalhadas na semana
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

            // total de horas trabalhadas no mês
            const monthlyTotalHours = weekTotalHours * weeksPerMonth
        
            // qual será o valor da minha hora?
            const valueHour = data["monthly-budget"] / monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour
            }

            return res.redirect('/profile')
        }
    }
}

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 1,
            created_at: Date.now(),
            budget: 4500
        },
        {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 3,
            "total-hours": 47,
            created_at: Date.now(),
            budget: 4500
        }
    ],

    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map((job) => {
                // ajustes no job
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'

                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
                }
            })

            return res.render(views + "index", { jobs: updatedJobs })
        },

        create(req, res) {
            return res.render(views + "job")
        },

        save(req, res) {
            // req.body = { name: , "daily-hours": , "total-hours": }
            const lastId = Job.data[Job.data.length - 1]?.id || 0;

            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now() // atribuindo a data de hoje
            })
            return res.redirect('/')
        },
        
        show(req, res) {
            // pega dos parametros http, o id do projeto
            const jobId = req.params.id
            
            // find verifica se o id do job é igual ao id do jobId, se for true, coloca no const job, se não, continua procurando no array Job.data e se não achar, retorna vazio
            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            // se não existir o id requisitado, retorna um job not found
            if (!job) {
                return res.send('Job not found!')
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

            return res.render(views + "job-edit", { job })
        },

        update(req, res) {
            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if (!job) {
                return res.send('Job not found!')
            }

            const updateJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"]
                // possível update: se o usuário não preencher algum campo, irá subscrever como valor nulo e portanto alterar toda conta do projeto. Para solucionar isso, basta tratar o erro. Se ele não preencher, não altera o projeto.
            }

            // Somente se o id do job passado na função, for o id que eu alterei, vai me retornar um novo objeto pro Job.data
            Job.data = Job.data.map(job => {

                if(Number(job.id) === Number(jobId)) {
                    job = updateJob
                }

                return job
            })

            res.redirect('/job/' + jobId)
        },

        delete(req, res) {
            const jobId = req.params.id

            // o método filter irá filtrar o array, devolvendo um novo array sem o comando da função. Nesse caso devolvendo um novo array sem o job.id que for igual ao jobId. Ex: peguei o id 2, o filter vai comparar o id 1 (que faz parte do array) com o id 2, se eles forem diferentes (o que signifca que deu true no comando !== da função), o filter continua comparando. Daí ele vai comparar o id 2 com o id 2 que foi pego no params, se eles forem iguais (o que signifca que deu false no comando da função), o filter vai tirar ele do array e devolver um novo array sem o id 2.
            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

            return res.redirect('/')
        }
    },

    services: {
        remainingDays(job) {
            // calculo de tempo restante
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed() //.toFixed() arredonda pra cima ou pra baixo

            // adiciona os dias restantes à data de criação
            const createdDate = new Date(job.created_at)
            // Pega a data de criação e soma com a quantidade de dias que faltam (data futura)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            // Cria data de vencimento 
            const dueDateInMs = createdDate.setDate(dueDay)

            // Faz a diferença do tempo que vai vencer - o tempo de agora
            const timeDiffInMs = dueDateInMs - Date.now()

            //transformar millisegundos em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)

            // restam x dias
            return dayDiff
        },
        
        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
}


routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index) 
routes.post('/profile', Profile.controllers.update) 

module.exports = routes;