import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})

export class PermissService {

    public permiss: JsonPermiss = {
        up_rowid: true,
        up_adcnar: true,
        up_mdfcar: true,
        up_brrar: true,
        up_lstar: true
    };

}


export interface JsonPermiss {
    up_rowid: boolean,
    up_adcnar: boolean,
    up_mdfcar: boolean,
    up_brrar: boolean,
    up_lstar: boolean
}