import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-dialog-store',
    templateUrl: './dialog-store.component.html',
    styleUrls: ['./dialog-store.component.scss'],
})
export class DialogStoreComponent implements OnInit {


    menssageModal: string = '';
    model: any = {
        "bo_actva": "",
        "bo_cdgo": "",
        "bo_dscrpcion": "",
        "bo_plnta": "",
        "bo_prpia": ""
    };
    bo_plnta: string = '';

    constructor(private _httpClient: HttpClient, public dialogRef: MatDialogRef<DialogStoreComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        if (this.data.mod) {
            this.menssageModal = "Editar bodega";
            this.model = this.data.mod;
            this.model.bo_actva = this.model.bo_actva.toString();
            this.model.bo_prpia = this.model.bo_prpia.toString()
        } else {
            this.menssageModal = "Crear bodega"
        }
    }




    /**
         * @description función que valida si se tienen permisos de adición activos y crea la bodega
         * @param 
         * @author Jhonatan David Mosquera
         * @date 17/08/2023
         * @returns {void}
    */
    saveStore(): void {
        try {
            let modelSend = { ...this.model }
            modelSend.bo_actva = Number(this.model.bo_actva);
            modelSend.bo_prpia = Number(this.model.bo_prpia);

            if (this.data.mod) {
                const urlGetDataStore = `https://localhost:7271/api/Bodegas/${modelSend.bo_cdgo}`;
                this._httpClient.put(urlGetDataStore, this.model).subscribe((data: any) => {
                    this.dialogRef.close(true);
                });
            } else {
                const urlGetDataStore = 'https://localhost:7271/api/Bodegas';
                this._httpClient.post(urlGetDataStore, this.model).subscribe((data: any) => {
                    if (data) {
                        this.dialogRef.close(true);
                    }
                });
            }
        } catch (error) {
            console.log("error en la función ", error);
        }
    }

    /**
         * @description función que cierra el modal sin generar ningún cambio den la aplicación
         * @param 
         * @author Jhonatan David Mosquera
         * @date 17/08/2023
         * @returns {void}
    */
    exitDialog(): void {
        try {
            this.dialogRef.close();
        } catch (error) {
            console.log("error en la función ", error);
        }
    }

}