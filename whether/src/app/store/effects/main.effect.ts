import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AppAction from './../actions/main.action';
import { tap, switchMap, catchError, map } from 'rxjs/operators';
import { AuthService } from './../../services/auth.service';

import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class MainEffects {
    constructor(private actionsListener$: Actions, private Auth: AuthService, private route: Router) { }
    @Effect()
    Login$ = this.actionsListener$.pipe(ofType(AppAction.LOGIN)).pipe(switchMap<any, Observable<any>>((loggedUser) => {
        if (loggedUser.isLogged) {
            return;
        }
        return this.Auth.login(loggedUser.payload).pipe(
            map(result => {
                this.Auth.token = result;
                sessionStorage.setItem('token', JSON.stringify(result));
                this.route.navigate(['users']);
                return new AppAction.LoginSucces();
            }),
            catchError(err => of(new AppAction.LoginFail(err)))
        );
    }));
    // @Effect()
    // LogOut$ = this.actionsListener$.pipe(ofType(AppAction.LOGOUT)).pipe(switchMap(() => {
    //     debugger;
    //     return new Observable<any>().pipe(map(result => {
    //         debugger;
    //         sessionStorage.removeItem('token');
    //         this.route.navigate(['']);
    //     }),
    //         catchError(err => of(new AppAction.LoginFail(err))));
    // }));
}
