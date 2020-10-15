const app = require('./lib/app');

let port;

if(process.env.PORT){
    port =  parseInt(process.env.PORT, 10);
}else{
    port = 3000;
}

app.listen(port, ()=>{
    console.log(`API runing on port: ${port}`)
});
