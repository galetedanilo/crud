import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _firestore = inject(Firestore);

  addUser(user: User) {
    const userRef = collection(this._firestore, 'users');
    return addDoc(userRef, user);
  }

  getUsers(filter = ''): Observable<User[]> {
    const userRef = collection(this._firestore, 'users');
    let q = query(userRef);

    if (filter) {
      q = query(userRef, where('name', '==', filter));
    }

    return collectionData(q) as unknown as Observable<User[]>;
  }

  async updateUser(user: User) {
    const userRef = collection(this._firestore, 'users');
    let q = query(userRef, where('id', '==', user.id));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async(document) => {
      const docRef = doc(this._firestore, 'users', document.id)
      await updateDoc(docRef, {...user})
    })
  }
}
