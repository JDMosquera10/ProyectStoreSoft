import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_PAGINATOR_INTL_PROVIDER, MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DialogStoreComponent } from './diallog-store/dialog-store.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PermissService } from 'src/app/servicesPermiss.services';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {


  displayedColumns: string[] = ['bo_cdgo', 'bo_dscrpcion', 'bo_prpia', 'bo_plnta', 'bo_actva', 'bo_actions'];
  resultsLength = 0;
  data: any[] = [];

  constructor(
    private _httpClient: HttpClient, 
    public dialog: MatDialog, 
    private _snackBar: MatSnackBar,
    public permiss: PermissService
    ) {

  }


  ngOnInit() {
    this.getDataTable();
  }

  /**
     * @description función que carga los datos de la tabla de bodegas
     * @param 
     * @author Jhonatan David Mosquera
     * @date 17/08/2023
     * @returns {void}
  */
  getDataTable(): void {
    try {
      const urlGetDataStore = 'https://localhost:7271/api/Bodegas';
      this._httpClient.get(urlGetDataStore).subscribe((data: any) => {
        if (Array.isArray(data)) {
          this.resultsLength = data.length;
          this.data = data;
          console.log(data);
        } else {
          this.data = [];
          this.resultsLength = 0
          console.log(data);
        }
      });
    } catch (error) {
      this.data = [];

      console.error("error en la función ", error);
    }
  }

  /**
     * @description función que abre el modal de creación y edición de las bodegas
     * @param 
     * @author Jhonatan David Mosquera
     * @date 17/08/2023
     * @returns {void}
  */
  openDialog(edit?: any, see?: boolean): void {
    try {

      const dialogRef = this.dialog.open(DialogStoreComponent, {
        data: {
          mod: edit,
          onlyRead: see ? true : false
        },
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getDataTable();
          let menssageAlert = '';
          if (edit) {
            menssageAlert = "Se editó correctamente el registro"
          } else {
            menssageAlert = "Se creó correctamente el registro"
          }
          this._snackBar.open(menssageAlert, 'Cerrar', {
            horizontalPosition: "end",
            verticalPosition: "top",
            duration: 3000
          });
        }
      });
    } catch (error) {
      console.log("error en la función ", error);
    }
  }


  /**
     * @description función que elimina el registro de bodegas y actualiza la lista de bodegas
     * @param 
     * @author Jhonatan David Mosquera
     * @date 17/08/2023
     * @returns {void}
  */
  deleteRegister(data: any): void {
    try {
      const urlGetDataStore = `https://localhost:7271/api/Bodegas/${data.bo_cdgo}`;
      this._httpClient.delete(urlGetDataStore).subscribe((data: any) => {
        this.getDataTable();
      });
    } catch (error) {
      console.log("error en la función ", error);
    }
  }

}

