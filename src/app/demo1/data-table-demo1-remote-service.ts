import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { DataTableParams } from '../data-table';
import 'rxjs/add/operator/toPromise';


const BASE_URL = 'http://localhost:4200';

function paramsToQueryString(params: DataTableParams) {
    let result = [];

    if (params.offset != null) {
        result.push(['_start', params.offset]);
    }
    if (params.limit != null) {
        result.push(['_limit', params.limit]);
    }
    if (params.sortBy != null) {
        result.push(['_sort', params.sortBy]);
    }
    if (params.sortAsc != null) {
        result.push(['_order', params.sortAsc ? 'ASC' : 'DESC']);
    }

    return result.map(param => param.join('=')).join('&');
}


@Injectable()
export class RemoteService {

    constructor (private http: Http) {}

    query(params: DataTableParams, id:any) {
        var idd = `${BASE_URL}/assets/datasam${id}.json`;
        console.log('idd .... ',idd);
        return this.http.get(`${BASE_URL}/assets/datasam${id}.json`).toPromise()
            .then((resp: Response) => ({
                items: resp.json(),
                count: Number(resp.headers.get('X-Total-Count'))
            }));
    }
}
