function fetchData(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
           let data="server side data";
           if (data){   
           resolve(data);
           }else{
           reject("no data");
           }
        },5000)

        
    })
}

async function getData(){
try{
    await fetchData();
}catch (error){

}
}

getData();