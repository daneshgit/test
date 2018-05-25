const async=require('async');


let cleanroom=()=>{
    return new Promise((resolve,reject)=>{
       
        resolve("clean room");
    })
}



let removegarbage=(p)=>{
 
    return new Promise((resolve,reject)=>{
      resolve(p+"     remove garbage");
    })
}


let winicecream=(p)=>{
   return new Promise((resolves,rejects)=>{
        
 const datas=new Promise((resolve,reject)=>{
     resolve(p+"    pour it");
 })
 
 
  datas.then((result)=>{
     resolves(result+"     win icecream")
 })
 
 
     })
}





/*const data=()=>{

    return  cleanroom()
    .then((d)=>{return removegarbage( d ) })
    .then((d)=>{return winicecream(d)} )
    .then((d)=>{return d})

    
}
*/

const data=async()=>{
        const a= await cleanroom();
        const b=await removegarbage(a);
        const c=await winicecream(b);
        return c
         }



data().then(d=>console.log("d  "+d));