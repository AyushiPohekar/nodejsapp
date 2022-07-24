// const fs=require('fs');
// fs.readFile('./cool.txt',"utf-8",(err,data)=>{
// if(err){
//     console.log("X",err);
// }
// else
// console.log(data);
// });

// const fs=require('fs');
// const quote3="No beauty shines better than that of a good heart";
// fs.appendFile('./fun.html',"\n"+quote3,(err)=>{console.log("Completed updating");});

const fs=require('fs');
fs.unlink("./delete-me.css",(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("completed deleting");
    }
})
