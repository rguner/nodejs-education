const fnc1 = () => {
    return new Promise<boolean>( (resolve, reject) => {
        setTimeout(() => {
            console.log("fnc1 Call");
            resolve(true)
        }, 3000);
    })
} 

const fnc2 = () => {
    return new Promise<boolean>( (resolve, reject) => {
        setTimeout(() => {
            console.log("fnc2 Call");
            resolve(true)
        }, 2000);
    })
} 

const fnc3 = () => {
    return new Promise<boolean>( (resolve, reject) => {
        setTimeout(() => {
            console.log("fnc3 Call");
            resolve(true)
        }, 1000);
    })
} 

export const fncCallWithThen = async () => {
    
    fnc1().then(() => {
        fnc2().then(( () => {
            fnc3().then( () => {
                console.log("All Fnc Finsh");
            }).catch(() => {
        
            })
        })).catch(() => {
        
        })
    }).catch(() => {

    })
    console.log("This Line Call");
    
    

    /*
    await fnc1()
    await fnc2()
    await fnc3()
    console.log("All Fnc Finsh");
    */
}