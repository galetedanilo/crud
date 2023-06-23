import { Routes } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UsersAddComponent } from './pages/users-add/users-add.component';
import { UsersEditComponent } from './pages/users-edit/users-edit.component';

export const usersRoutes: Routes = [
  { path: '', title: 'Users - List', component: UsersListComponent },
  { path: 'add', title: 'Users - Add', component: UsersAddComponent },
  { path: 'edit', title: 'Users - Edit', component: UsersEditComponent },
];
