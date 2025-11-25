import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf?: string;
  birthDate?: string;
  photo?: string;
  createdAt: Date;
}

export interface Address {
  id: string;
  label: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  isDefault: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mockProfile: UserProfile = {
    id: '1',
    name: 'Cliente Exemplo',
    email: 'cliente@example.com',
    phone: '(18) 99656-6692',
    cpf: '123.456.789-00',
    birthDate: '1990-01-01',
    photo: 'https://i.pravatar.cc/150?img=1',
    createdAt: new Date('2024-01-01')
  };

  private mockAddresses: Address[] = [
    {
      id: '1',
      label: 'Casa',
      zipCode: '19000-000',
      street: 'Rua Exemplo',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'Presidente Prudente',
      state: 'SP',
      isDefault: true
    }
  ];

  constructor() {}

  // GET /api/user/profile
  getProfile(): Observable<UserProfile> {
    return of(this.mockProfile).pipe(delay(300));
  }

  // PUT /api/user/profile
  updateProfile(profile: Partial<UserProfile>): Observable<UserProfile> {
    this.mockProfile = { ...this.mockProfile, ...profile };
    return of(this.mockProfile).pipe(delay(500));
  }

  // PUT /api/user/change-password
  changePassword(currentPassword: string, newPassword: string): Observable<boolean> {
    return of(true).pipe(delay(500));
  }

  // GET /api/user/addresses
  getAddresses(): Observable<Address[]> {
    return of(this.mockAddresses).pipe(delay(300));
  }

  // POST /api/user/addresses
  addAddress(address: Address): Observable<Address> {
    const newAddress = { ...address, id: Date.now().toString() };
    this.mockAddresses.push(newAddress);
    return of(newAddress).pipe(delay(500));
  }

  // DELETE /api/user/addresses/:id
  deleteAddress(addressId: string): Observable<boolean> {
    this.mockAddresses = this.mockAddresses.filter(a => a.id !== addressId);
    return of(true).pipe(delay(300));
  }

  // PUT /api/user/addresses/:id/set-default
  setDefaultAddress(addressId: string): Observable<boolean> {
    this.mockAddresses = this.mockAddresses.map(a => ({
      ...a,
      isDefault: a.id === addressId
    }));
    return of(true).pipe(delay(300));
  }

  // DELETE /api/user/account
  deleteAccount(): Observable<boolean> {
    return of(true).pipe(delay(500));
  }
}
