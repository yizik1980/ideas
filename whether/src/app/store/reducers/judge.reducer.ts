import * as AppAction from '../actions/judges.action';
import Judge from '../../model/judge';

export interface IJudgeState {
    data: Judge[];
    loaded: boolean;
    loading: boolean;
    deleteJudge: Judge;
    judgeInsert: Judge;
}

const defaultState: IJudgeState = {
    loading: false,
    data: [
    ],
    loaded: false,
    deleteJudge: null,
    judgeInsert: null,
};

export function JudgeReducer(state = defaultState, action: AppAction.JudgesActionType): IJudgeState {

    switch (action.type) {
        case AppAction.LOAD_JUDGES: {
            return {
                ...state,
                loading: true
            };
        }
        case AppAction.LOAD_JUDGES_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                data: action.payload
            };
        }
        case AppAction.LOAD_JUDGES_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
        case AppAction.DELETE_JUDGE: {
            return {
                ...state,
                deleteJudge: action.payload
            };
        }
        case AppAction.SAVE_JUDGE: {
            return {
                ...state,
                judgeInsert: action.payload
            };
        }
    }
    return state;
}
