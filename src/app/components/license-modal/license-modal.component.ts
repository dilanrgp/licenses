import { Component, computed, effect, inject, input, model, output, signal } from '@angular/core';
import { License } from '../../interfaces/license.interface';
import { DatePipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { ChangeLanguagePipe } from '../../pipes/change-language.pipe';
import { OrderPositionPipe } from '../../pipes/order-position.pipe';
import { LoaderService } from '@services/loader.service';
import { LicenseService } from '@services/licenses.service';
import { ToastMessageService } from '@services/toast-message.service';
import { LocaleService } from '@services/locale.service';

@Component({
  selector: 'app-license-modal',
  imports: [ChangeLanguagePipe, OrderPositionPipe, DatePipe, TitleCasePipe],
  templateUrl: './license-modal.component.html',
})
export class LicenseModalComponent { 

  localeService = inject(LocaleService);
  licenseService = inject(LicenseService);
  messageService = inject(ToastMessageService);
  loaderService = inject(LoaderService);

  licenseData = model<License | null>(null);

  loading = signal(false);
  licenseFiles = computed(() => this.licenseData()?.license_file ?? []);
  textButtonSend = computed(() => {
    const langString = (this.licenseData()?.license_status_id == 2) ? 'common.resend_license' : 'common.send_license';
    return this.localeService.translate(langString);
  })
  
  // Outputs
  closed = output<License>();
  
  // Public methods
   onClose() {
    const modal = document.getElementById('modal-license') as HTMLDialogElement;
    modal.close();
    this.closed.emit(this.licenseData()!);
  }

  sendMail(){
    this.loading.set(true);

    this.licenseService.sendMailByLicense(this.licenseData()!).subscribe({
      next: (response) => {
        
        if (response.success) {
          this.licenseData.set(response.data!)
          this.messageService.toast({ originalMessage: 'license.modal.sent_success', type: 'success', translate: true});
        }

        setTimeout(() => {
          this.loading.set(false);
        }, 1000);
      },
      error: (errorResponse) => {
        this.loading.set(false);
        this.messageService.toast({ originalMessage: 'errors.obtaining_terms', type: 'error', translate: true});
        this.licenseData.set(errorResponse.error.data!);
      },
    });


  }


  

}
