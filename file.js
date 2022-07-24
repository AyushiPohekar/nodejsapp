const fs=require('fs');
const quote="No beauty shines better than that of a good heart";
fs.writeFile("./awesome.html",quote,(err)=>{console.log("Completed writing");});



const quote2 = "Live more worry less";
for (let i = 0; i <= 10; i++) {
  fs.writeFile(`./backup/text-${i}.html`, quote2, (err) => {
    console.log("Completed writing");
  });
}

