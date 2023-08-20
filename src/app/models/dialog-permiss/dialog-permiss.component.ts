import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { PermissService } from "src/app/servicesPermiss.services";

@Component({
    selector: 'app-dialog-permiss',
    templateUrl: './dialog-permiss.component.html',
    styleUrls: ['./dialog-permiss.component.scss'],
})
export class DialogPermissComponent implements OnInit {


    modelPermiss: any;
    allComplete: boolean = false;
    task: any = {
        name: 'Todas los Permisos',
        completed: false,
        color: 'primary',
        subtasks: [
            { name: 'Adición', value: "up_adcnar", completed: false, color: 'primary' },
            { name: 'Edición', value: "up_mdfcar", completed: false, color: 'primary' },
            { name: 'Eliminación', value: "up_brrar", completed: false, color: 'primary' },
            { name: 'Ver Detalles', value: "up_lstar", completed: false, color: 'primary' },
        ],
    };

    constructor(public permiss: PermissService, public dialogRef: MatDialogRef<DialogPermissComponent>, private _httpClient: HttpClient,) {
        this.modelPermiss = permiss.permiss;
    }

    ngOnInit(): void {
        for (let item of this.task.subtasks) {
            item.completed = this.modelPermiss[item.value];
        }
    }

    updateAllComplete() {
        this.allComplete = this.task.subtasks != null && this.task.subtasks.every((t: any) => t.completed);
    }

    someComplete(): boolean {
        if (this.task.subtasks == null) {
            return false;
        }
        return this.task.subtasks.filter((t: any) => t.completed).length > 0 && !this.allComplete;
    }

    setAll(completed: boolean) {
        this.allComplete = completed;
        if (this.task.subtasks == null) {
            return;
        }
        this.task.subtasks.forEach((t: any) => (t.completed = completed));
    }


    /**
         * @description 
         * @param 
         * @author Jhonatan David Mosquera
         * @date 
         * @returns 
    */
    editPermiss(): void {
        try {
            for (let item of this.task.subtasks) {
                this.modelPermiss[item.value] = item.completed ? 1 : 0;
            }
            const modelSend = this.modelPermiss;
            const urlGetDataStore = `https://localhost:7271/api/Permisos/${modelSend.up_rowid}`;
            this._httpClient.put(urlGetDataStore, modelSend).subscribe((data: any) => {
                this.permiss.permiss = modelSend;
                this.dialogRef.close();
            });
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