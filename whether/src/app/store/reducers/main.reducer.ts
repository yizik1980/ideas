import * as mainAction from './../actions/main.action';
import { PopupContent } from 'src/app/model/user';
import { LoginUser } from 'src/app/model/login-user';

export interface IMainState {

    login: LoginUser;
    isLogged: boolean;
}
const MainState: IMainState = {

    login: new LoginUser(),
    isLogged: false,
};

export function MainReducer(state = MainState, action: mainAction.mainActiontype): IMainState {
    switch (action.type) {
        case mainAction.LOGIN: {
            return {
                ...state,
                login: action.payload
            };
        }
        case mainAction.LOGIN_SUCCESS: {
            return {
                ...state,
                isLogged: true
            };
        }
        case mainAction.LOGIN_FAIL: {
            return {
                ...state,
                isLogged: false
            };
        }
        case mainAction.LOGOUT: {
            return {
                ...state,
                isLogged: action.payload
            };
        }
        default:
            break;
    }
    return state;
}
