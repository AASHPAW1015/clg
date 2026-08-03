function task1(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("task 1 completed");
            resolve();
        },5000)
    })
}
function task2(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("task 2 completed");
            resolve();
        },5000)
    })
}
function task3(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("task 3 completed");
            resolve();
        },5000)
    })
}
task1()
.then((result)=>{
    return task2();
})
.then((result)=>{
    return task3();
})
.catch((error)=>{
    console.log(error);
})
