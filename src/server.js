const express = require("express")
const server = express()
const db = require("./database/db")

//configurar public
server.use(express.static("public"))

// habilidar o uso do req.body
server.use(express.urlencoded({extended:true}))

// utilizando o nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// configurar caminhos
server.get("/",(req, res) => {
    //esta sem o caminho completo graças ao nunjucks
    //title é a variavel que tem dentro de index.html
    return res.render("index.html", {title: "Um titulo"})
})

server.get("/create-point",(req, res) => {
    return res.render("create-point.html")
})

server.get("/search",(req, res) => {
    const search = req.query.city

    if(search == "") {
        //Pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }
    
    // Consultar dados
    db.all(`SELECT * FROM places WHERE city = '${search}'`, function(err,rows){
        if(err) return console.log(err)
        const total = rows.length

        return res.render("search-results.html", {places: rows, total})
    })
})

server.post("/savepoint",(req,res) => {
    
    const query = `
        INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
      ) VALUES (?,?,?,?,?,?,?);
`

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    db.run(query, values, function(err){
        if(err) return res.render("create-point.html", {saved:false})
        return res.render("create-point.html", {saved: true})
    })

})

// Ligar server
server.listen(3000)