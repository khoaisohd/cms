import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { GradeReportComponent } from './grade-report.component';
import { GradeReportDetailComponent } from './grade-report-detail.component';
import { GradeReportPopupComponent } from './grade-report-dialog.component';
import { GradeReportDeletePopupComponent } from './grade-report-delete-dialog.component';

import { Principal } from '../../shared';

export const gradeReportRoute: Routes = [
    {
        path: 'grade-report',
        component: GradeReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GradeReports'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'grade-report/:id',
        component: GradeReportDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GradeReports'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gradeReportPopupRoute: Routes = [
    {
        path: 'grade-report-new',
        component: GradeReportPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GradeReports'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'grade-report/:id/edit',
        component: GradeReportPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GradeReports'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'grade-report/:id/delete',
        component: GradeReportDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GradeReports'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
