import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

import { ChangeLanguagePipe } from '@pipes/change-language.pipe';
import { ApiLicenseResponse, License } from '@interfaces/license.interface';
import { OrderPositionPipe } from '@pipes/order-position.pipe';

@Component({
  selector: 'app-licenses-table',
  imports: [OrderPositionPipe, ChangeLanguagePipe],
  templateUrl: './licenses-table.component.html',
})
export class LicensesTableComponent {

  selectionChanged = output<License[]>();
  licenseSelected = output<License>();

  licenseResponse = input.required<ApiLicenseResponse>();
  updatedLicense = input<License | null>();

  licenses = linkedSignal(() => this.licenseResponse().data as License[]);
  selectedIds = signal<number[]>([]);

  updateEffect = effect(() => {
    const license = this.updatedLicense();
    if (license) {
      this.updateLicenseList(license);
    }
  });

  allSelected(): boolean {
    const allIds = this.licenses().map((l) => l.id);
    return allIds.every((id) => this.selectedIds().includes(id));
  }

  selectLicense(license: License) {
    this.licenseSelected.emit(license);
  }

  updateLicenseList(licenseInformation: License) {
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
  }

  toggleAll() {
    const all = this.licenses();
    const updated = this.allSelected() ? [] : all.map((l) => l.id);
    this.selectedIds.set(updated);

    const selectedLicenses = all.filter((l) => updated.includes(l.id));
    this.selectionChanged.emit(selectedLicenses);
  }

  toggleId(id: number) {
    const current = this.selectedIds();
    const alreadySelected = current.includes(id);
    const updated = alreadySelected
      ? current.filter((existingId) => existingId !== id)
      : [...current, id];

    this.selectedIds.set(updated);

    const selectedLicenses = this.licenses().filter((l) => updated.includes(l.id));
    this.selectionChanged.emit(selectedLicenses);
  }
}
