import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthGuard } from "./shared/guards/auth.guard";

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'categories',
        canActivate: [AuthGuard],
        component: AdminLayoutComponent,
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
    },
    {
        path: "**",
        redirectTo: 'categories'
    }
];