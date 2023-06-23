import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss'],
})
export class UsersEditComponent implements OnInit {
  private _location = inject(Location);
  private user!: User;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    cards: new FormArray([]),
  });

  ngOnInit(): void {
    this.user = (this._location.getState() as any).user as User;
    if (this.user) this.setCurrentUser(this.user);
  }

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

  private setCurrentUser(user: any): void {
    this.form.patchValue(this.user as any);

    user.cards.map((card: any) => {
      const cardForm = new FormGroup({
        name: new FormControl(card.name),
        description: new FormControl(card.description),
      });

      (this.form.get('cards') as FormArray).push(cardForm);
    });
  }
}
