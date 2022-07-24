const os=require("os");
console.log("free memory in GB",os.freemem()  / 1024 / 1024/ 1024);
console.log("total memory in GB",os.totalmem()  / 1024 / 1024/ 1024);
console.log("version",os.version());
console.log("cpus",os.cpus());