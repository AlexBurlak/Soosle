import { Routes } from "@angular/router";
import { AddComponent } from "./add/add.component";
import { LayoutComponent } from "./layout/layout.component";
import { TableComponent } from "./table/table.component";

export const routes: Routes = [
    {
        path: '**',
        component: LayoutComponent
    },
]