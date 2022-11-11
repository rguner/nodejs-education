const fnc1 = () => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            console.log("fnc1 Call");
            resolve(true)
        }, 3000);
    })
} 
const fnc2 = () => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            console.log("fnc2 Call");
            resolve(true)
        }, 2000);
    })
} 
const fnc3 = () => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            console.log("fnc3 Call");
            resolve(true)
        }, 1000);
    })
} 
export const fncCall = () => {
    fnc1().then(() => {
        fnc2().then(( () => {
            fnc3().then( () => {
                console.log("All Fnc Finsh");
            })
        }))
    })
}

export const fncCallSync = () => {
    fnc1()
    fnc2()
    fnc3()
    console.log("All Fnc Sync Call Finsh");
}