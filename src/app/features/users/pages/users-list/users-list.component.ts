import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { Observable, debounceTime } from 'rxjs';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  private _router = inject(Router);
  private _service = inject(UsersService);

  users$!: Observable<User[]>;
  search = new FormControl('');

  ngOnInit(): void {
    this.users$ = this._service.getUsers();

    this.search.valueChanges.pipe(debounceTime(1000)).subscribe((search) => {
      if (search) {
        this.users$ = this._service.getUsers(search);
      } else {
        this.users$ = this._service.getUsers();
      }
    });
  }

  onAddUser(): void {
    this._router.navigate(['users', 'add']);
  }

  onEditUser(user: User): void {
    this._router.navigateByUrl('users/edit', { state: { user } });
  }

  onDeleteUser(user: User): void {
    this._service.deleteUser(user.id);
  }
}
