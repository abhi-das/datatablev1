import { Component, ViewChild } from '@angular/core';
import { DataTable, DataTableTranslations, DataTableResource } from '../data-table';
import { films } from './data-table-demo3-data';

import { RemoteService } from '../demo1/data-table-demo1-remote-service';


@Component({
  selector: 'data-table-demo-3',
  templateUrl: './data-table-demo3.html',
  styleUrls: ['./data-table-demo3.css'],
  providers: [RemoteService]
})
export class DataTableDemo3 {

    filmResource = new DataTableResource(films);
    films = [];
    filmCount = 0;

    items = [];
    itemCount = 0;

    oldRow = null;
    newRow = null;
    viz:boolean = false;

    currentRowCount = 0;

    @ViewChild(DataTable) filmsTable;

    constructor(private remoteService: RemoteService) {
        this.filmResource.count().then(count => this.filmCount = count);
    }

    reloadFilms(params) {
        this.filmResource.query(params).then(films => this.films = films);
    }

    cellColor(car) {
        return 'rgb(255, 255,' + (155 + Math.floor(100 - ((car.rating - 8.7)/1.3)*100)) + ')';
    };

    // special params:

    translations = <DataTableTranslations>{
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'
    };

    carClicked(ev: any): void {
        console.log('ee..');
    }

    tes(params: any): void {

        this.currentRowCount = params.row.index;        
        // console.log('currentRowCount..', this.currentRowCount);

        if(params.row !== this.oldRow && this.oldRow !== null) {

            this.oldRow.expanded = false;
            // console.log('old row::', this.oldRow);
            // console.log('new row::', params.row);
        }
        this.viz = true;
        console.log('params..', params);
        // console.log('isexpanded..', params.row.expanded);
        // params.reload(params);

        if (params.row.expanded === true) {
            
            this.remoteService.query(params, this.currentRowCount).then(result => {
                this.items = result.items;
                this.itemCount = result.count;
                this.viz = false;
            });
        
        }

        this.oldRow = params.row;
    }

    reloadItems(params) {
        this.remoteService.query(params, this.currentRowCount).then(result => {
            this.items = result.items;
            this.itemCount = result.count;
        });
    }

    rowTooltip(item) { return item.jobTitle; }
}
