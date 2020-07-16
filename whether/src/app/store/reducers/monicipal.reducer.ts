import * as mainAction from '../actions/main.action';
import monicipals from '../../model/monicipalsList';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface IMonicipalState {
    monicipal: any;
}
const MonicipalState: IMonicipalState = {
    monicipal: monicipals[0]
};

export function MonicipalReducer(state = MonicipalState, action: mainAction.mainActiontype): IMonicipalState {
    switch (action.type) {
        case mainAction.MONICIPAL_CHANGE: {
            return {
                ...state,
                monicipal: action.payload
            };
        }
        default:
            break;
    }
    return state;
}

export const selectMonicipalState = createFeatureSelector<IMonicipalState>('monicipal');
export const monicipalSelector = createSelector(selectMonicipalState, m => m.monicipal);
