import {OPEN_DRAWER,CLOSE_DRAWER,INIT_DRAWER} from './types'

export const initDrawer = drawerName => {
   return {
       type: INIT_DRAWER,
       drawerName
   }
}

export const openDrawer = drawerName => {
    return {
        type: OPEN_DRAWER,
        drawerName
    }
}

export const closeDrawer = drawerName => {
    return {
        type: CLOSE_DRAWER,
        drawerName
    }
}