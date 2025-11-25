import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService, UserProfile, Address } from '../../services/user.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private notificationService = inject(NotificationService);
  
  activeTab = signal('profile');
  profile = signal<UserProfile | null>(null);
  addresses = signal<Address[]>([]);
  isLoading = signal(false);
  isSaving = signal(false);
  isEditingProfile = signal(false);
  showAddressModal = signal(false);

  profileForm: Partial<UserProfile> = {};
  addressForm: Partial<Address> = {};
  passwordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProfile();
    this.loadAddresses();
  }

  loadProfile() {
    this.isLoading.set(true);
    this.userService.getProfile().subscribe({
      next: (profile) => {
        this.profile.set(profile);
        this.profileForm = { ...profile };
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  loadAddresses() {
    this.userService.getAddresses().subscribe({
      next: (addresses) => this.addresses.set(addresses)
    });
  }

  switchTab(tab: string) {
    this.activeTab.set(tab);
  }

  enableProfileEdit() {
    this.isEditingProfile.set(true);
  }

  cancelProfileEdit() {
    this.isEditingProfile.set(false);
    this.profileForm = { ...this.profile()! };
  }

  saveProfile() {
    this.isSaving.set(true);
    this.userService.updateProfile(this.profileForm).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.isEditingProfile.set(false);
        this.loadProfile();
        this.notificationService.success('Perfil atualizado com sucesso!');
      },
      error: () => {
        this.isSaving.set(false);
        this.notificationService.error('Erro ao atualizar perfil');
      }
    });
  }

  changePassword() {
    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      this.notificationService.warning('As senhas não coincidem');
      return;
    }

    this.isSaving.set(true);
    this.userService.changePassword(this.passwordForm.currentPassword, this.passwordForm.newPassword).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };
        this.notificationService.success('Senha alterada com sucesso!');
      },
      error: () => {
        this.isSaving.set(false);
        this.notificationService.error('Erro ao alterar senha');
      }
    });
  }

  openAddressModal() {
    this.addressForm = {};
    this.showAddressModal.set(true);
  }

  closeAddressModal() {
    this.showAddressModal.set(false);
    this.addressForm = {};
  }

  saveAddress() {
    this.isSaving.set(true);
    this.userService.addAddress(this.addressForm as Address).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.closeAddressModal();
        this.loadAddresses();
        this.notificationService.success('Endereço salvo com sucesso!');
      },
      error: () => {
        this.isSaving.set(false);
        this.notificationService.error('Erro ao salvar endereço');
      }
    });
  }

  deleteAddress(addressId: string) {
    this.notificationService.confirm(
      'Deseja remover este endereço?',
      () => {
        this.userService.deleteAddress(addressId).subscribe({
          next: () => {
            this.loadAddresses();
            this.notificationService.success('Endereço removido!');
          },
          error: () => this.notificationService.error('Erro ao remover endereço')
        });
      }
    );
  }

  setDefaultAddress(addressId: string) {
    this.userService.setDefaultAddress(addressId).subscribe({
      next: () => this.loadAddresses()
    });
  }

  logout() {
    // Implementar logout
    this.router.navigate(['/auth/login']);
  }
}
