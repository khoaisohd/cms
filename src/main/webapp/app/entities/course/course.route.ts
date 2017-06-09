import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { CourseComponent } from './course.component';
import { CourseDetailComponent } from './course-detail.component';
import { CoursePopupComponent } from './course-dialog.component';
import { CourseDeletePopupComponent } from './course-delete-dialog.component';
import { CourseCatalogComponent } from './course-catalog.component';
import { CourseContentComponent } from './course-content.component';

import { Principal } from '../../shared';

export const courseRoute: Routes = [
    {
        path:'course-catalog',
        component: CourseCatalogComponent,
    },
    {
        path:'course-content/:id',
        component: CourseContentComponent,
    },
    {
        path: 'course',
        component: CourseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Courses'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'course/:id',
        component: CourseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Courses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const coursePopupRoute: Routes = [
    {
        path: 'course-new',
        component: CoursePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Courses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'course/:id/edit',
        component: CoursePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Courses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'course/:id/delete',
        component: CourseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Courses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
