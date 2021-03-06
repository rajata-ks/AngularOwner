import { Routes, RouterModule } from '@angular/router';
import { MenuItemFormComponent } from './menu-item-form.component';
import { MenuItemListComponent } from './menu-item-list.component';

const appRoutes: Routes = [
  { path: 'add', component: MenuItemFormComponent },
  { path: ':menu', component: MenuItemListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'all' }
];

export const routing = RouterModule.forRoot(appRoutes);
