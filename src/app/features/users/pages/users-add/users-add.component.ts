import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersAddComponent {
  private _service = inject(UsersService);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    cards: new FormArray([]),
  });

  get cards() {
    return (this.form.get('cards') as FormArray).controls;
  }

  onAddCard(): void {
    (this.form.get('cards') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
      })
    );
  }

  onAddUser(): void {
    this._service.addUser({
      id: new Date().getTime().toString(),
      ...this.form.getRawValue(),
    } as User);
  }
}
