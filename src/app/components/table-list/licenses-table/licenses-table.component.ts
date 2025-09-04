import { Component,computed,effect,inject,input,linkedSignal,output,signal } from '@angular/core';

import { ChangeLanguagePipe } from '@pipes/change-language.pipe';
import { ApiLicenseResponse, License } from '@interfaces/license.interface';
import { OrderPositionPipe } from '@pipes/order-position.pipe';
import { LicenseModalComponent } from '@components/license-modal/license-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '@services/modal.service';

@Component({
  selector: 'app-licenses-table',
  imports: [OrderPositionPipe,ChangeLanguagePipe,LicenseModalComponent,ReactiveFormsModule],
  templateUrl: './licenses-table.component.html',
})
export class LicensesTableComponent {

  modalService = inject(ModalService);

  selectionChanged = output<License[]>();
  licenseResponse = input.required<ApiLicenseResponse>();
  licenses = linkedSignal(() => this.licenseResponse().data as License[]);
  selectedLicense = signal<License | null>(null);
  selectedIds = signal<number[]>([]);
  
  allSelected(): boolean {
    const allIds = this.licenses().map(l => l.id);
    return allIds.every(id => this.selectedIds().includes(id));
  }

  modalEffect = effect(() => {
    const license = this.selectedLicense();
    if (license) {
      setTimeout(() => {
        this.modalService.open('modal-license');
      }, 500);
    }
  });

  selectLicense(license: License) {
    this.selectedLicense.set(license);
  }

  clearSelectedLicense(licenseInformation: License) {

    if (licenseInformation) {

      this.licenses.update((current) => {

        const index = current.findIndex((term) => term.id === licenseInformation.id);

        if (index >= 0) {
          current[index] = { ...current[index], ...licenseInformation };
          return [...current];
        } else {
          return [...current, licenseInformation];
        }
      });
    }
    
    this.selectedLicense.set(null);
  }

  toggleAll() {
    const all = this.licenses();
    const updated = this.allSelected() ? [] : all.map(l => l.id);
    this.selectedIds.set(updated);

    const selectedLicenses = all.filter(l => updated.includes(l.id));
    this.selectionChanged.emit(selectedLicenses);
  }

  toggleId(id: number) {
    const current = this.selectedIds();
    const alreadySelected = current.includes(id);
    const updated = alreadySelected ? current.filter(existingId => existingId !== id) : [...current, id];

    this.selectedIds.set(updated);

    // Emitir las licencias seleccionadas
    const selectedLicenses = this.licenses().filter(l => updated.includes(l.id));
    this.selectionChanged.emit(selectedLicenses);
  }


  // doActionWithSelected() {
  //   const selected = this.selectedLicenses();
  //   console.log('Licencias seleccionadas', selected);
  //   // Puedes eliminarlas, exportarlas, validarlas, etc.
  // }
}
