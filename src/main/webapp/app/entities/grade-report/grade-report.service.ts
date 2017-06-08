import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { GradeReport } from './grade-report.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class GradeReportService {

    private resourceUrl = 'api/grade-reports';

    constructor(private http: Http) { }

    create(gradeReport: GradeReport): Observable<GradeReport> {
        const copy = this.convert(gradeReport);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(gradeReport: GradeReport): Observable<GradeReport> {
        const copy = this.convert(gradeReport);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<GradeReport> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(gradeReport: GradeReport): GradeReport {
        const copy: GradeReport = Object.assign({}, gradeReport);
        return copy;
    }
}
