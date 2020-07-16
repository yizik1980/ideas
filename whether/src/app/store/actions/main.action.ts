import { Action, createSelector } from '@ngrx/store';



export const FETCHDATA = '[App] FETCHDATA ';
export const FETCHDATA_SUCCESS = '[App] FETCHDATA Success ';
export const FETCHDATA_FAIL = '[App] FETCHDATA Fail ';




export class FetchData implements Action {
    readonly type = FETCHDATA;
    constructor(public payload: any) { }
}
export class FetchDataSucces implements Action {
    readonly type = FETCHDATA_SUCCESS;
    constructor() { }
}
export class FetchDataFail implements Action {
    readonly type = FETCHDATA_FAIL;
    constructor(public payload: any) { }
}

export type mainActiontype = FetchData | FetchDataSucces | FetchDataFail;

