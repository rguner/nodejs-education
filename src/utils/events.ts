import events from 'events'

export const eventEmitter= new events.EventEmitter()

export enum eventEnum {
    fncOne = 'fncOne',
    fncTwo = 'fncTwo'
}

const one = (data: any) => {
    console.log("Event Call-1", data);  
}

const two = (data: any) => {
    console.log("Event Call-2", data);  
}

eventEmitter.on(eventEnum.fncOne, one)
eventEmitter.on(eventEnum.fncTwo, two)