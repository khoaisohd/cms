import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ReferenceComponent } from './reference.component';
import { ReferenceDetailComponent } from './reference-detail.component';
import { ReferencePopupComponent } from './reference-dialog.component';
import { ReferenceDeletePopupComponent } from './reference-delete-dialog.component';

import { Principal } from '../../shared';

export const referenceRoute: Routes = [
    {
        path: 'reference',
        component: ReferenceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'References'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'reference/:id',
        component: ReferenceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'References'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const referencePopupRoute: Routes = [
    {
        path: 'reference-new',
        component: ReferencePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'References'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reference/:id/edit',
        component: ReferencePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'References'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reference/:id/delete',
        component: ReferenceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'References'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
