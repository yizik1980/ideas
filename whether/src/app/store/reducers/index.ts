
import * as main from './main.reducer';
import * as judge from './judge.reducer';
import * as popup from './popup.reducer';
import * as monicipal from './monicipal.reducer';
import { combineReducers } from '@ngrx/store';
export interface AppState {
    main: main.IMainState;
    judge: judge.IJudgeState;
    monicipal: monicipal.IMonicipalState;
    popup: popup.IPopupState;
}

export const reducers = {
    main: main.MainReducer,
    judge: judge.JudgeReducer,
    monicipal: monicipal.MonicipalReducer,
    popup: popup.PopupReducer
};

const rootReducer = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return rootReducer(state, action);
}
