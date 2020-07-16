import * as popupAction from '../actions/popup.action';
import { PopupContent } from 'src/app/model/user';
import { LoginUser } from 'src/app/model/login-user';

export interface IPopupState {
    popup: PopupContent;
    show: boolean;
}
const PopupState: IPopupState = {
    popup: new PopupContent(),
    show: false,
};

export function PopupReducer(state = PopupState, action: popupAction.mainActiontype): IPopupState {
    switch (action.type) {
        case popupAction.POPUP_TRIGGER: {
            return {
                ...state,
                popup: action.payload,
                show: true
            };
        }
        case popupAction.POPUP_CLOSE: {
            return {
                ...state,
                show: false
            };
        }
        default:
            break;
    }
    return state;
}
