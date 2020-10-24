import {START_CHANNEL,STOP_CHANNEL,SERVER_ON,SERVER_OFF} from './types';

export const startChanel = () => {
    return {
        type: START_CHANNEL
    }
}

export const stopChannel = () => {
    return {
        type: STOP_CHANNEL
    }
}

export const serverOn = () => {
    return {
        type: SERVER_ON
    }
}

export const serverOff = () => {
    return {
        type: SERVER_OFF
    }
}