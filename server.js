const app = require("./app.js");

app.listen(process.env.PORT, (error)=>{
    if(error){
        console.log("Erro.");
    }
    else{
        //console.log(process.env);
        console.log(`Servidor rodando na porta ${process.env.PORT}.`);
    }
});