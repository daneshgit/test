const async=require('async');


let cleanroom=()=>{
    return new Promise((resolve,reject)=>{
       
        resolve("clean room");
    })
}



let removegarbage=(p)=>{
    const user=[1,2,3,4,5];
    return new Promise((resolve,reject)=>{
        let array=[];
        async.each(user,function(data,callback){
         array.push(data);
         callback();
        },function(err){
            resolve(array);
        })
    })
}


let winicecream=(p)=>{
    return new Promise((resolve,reject)=>{
        resolve(p);
    })
}


const data=()=>{
    
        return  cleanroom()
        .then(removegarbage)
        .then(winicecream)
        .then((d)=>{return d})
    
        
    }


data().then(d=>console.log(d));


/*
const data=()=>{

    return  cleanroom()
    .then((d)=>{return removegarbage( d ) })
    .then((d)=>{return winicecream(d)} )
    .then((d)=>{return d})

    
}
*/


