export const TRANSLATIONS = {
  en: {
    common: {
      button_accept: 'Accept',
      button_new: 'New',
      button_save: 'Save',
      client: 'Client',
      delete_license: 'Delete License',
      footer: '©2025 Teldat Group',
      label_actions: 'Actions',
      not: 'Not',
      yes: 'Yes',
      resend_license: 'Resend License',
      select_all: 'Select All',
      send_license: 'Send License',
      updated_success: 'Updated successfully',
      created_success: 'Created successfully',
    },

    navbar: {
      general_settings: 'Settings',
      licenses: 'Licenses', // ← Usa el valor común
      terms_conditions: 'Terms and Conditions',
    },

    license: {
      download_license: 'Download License',
      files: 'Files',
      invalid_file: 'Invalid file',
      name: 'License', // Referencia simbólica (opcional, si tu sistema lo soporta)
      not_file: 'File not found',
      plural_name: 'Licenses',

      table: {
        client_email: 'Client mail',
        idmaterial: 'Part Number',
        order_position: 'Order position',
        serial_number: 'Serial Number',
        serial_numbers: 'Serial Numbers',
        status: 'Status',
        no_licenses: 'No licenses to download',
      },

      modal: {
        accept_terms: 'Accept terms',
        general_information: 'General Information',
        mail_sent: 'Email sent',
        order: 'Order',
        po_position: 'PO/Position',
        sent_success: 'Sent successfully',
        title: 'License Information',
        tracking: 'Tracking',
        see_terms: 'See terms',
        material: 'Material',
        part_number: 'Part number',
        serial_number: 'Serial number',
        license_code: 'License code',
        number_of_licensed: 'Number of licensed devices',
        type: 'License Server/Type',
        bundle: 'Bundle',
        downloaded: 'Downloaded',
        pending_download: 'Pending download',
      },
    },

    terms_condition: {
      name: 'Terms and Conditions', // Referencia simbólica (opcional, si tu sistema lo soporta)

      table: {
        available_download: 'Can it be downloaded?',
        default: 'Default',
        description: 'Description',
        title: 'Title',
      },

      modal: {
        default: 'Default',
        title: 'Terms and Conditions',
        spanish_version: 'Spanish version',
        english_version: 'English version',
      },
    },

    license_template: {
      name: 'License Templates',

      table: {
        type: 'License Type',
        title: 'Title',
        logo: 'Logo image',
        content: 'Content',
        active: 'Active',
        no_templates: 'No templates found',
      },

      modal: {
        title: 'License Template',
        keyword_title: 'Keywords',
        keyword_copied: 'Keyword copied'
      }
    },

    keyword: {
      serial_number_bar_code: 'Barcode for the serial number.',
      start_date: 'Date in format (dd/mm/yyyy)',
      end_date: 'Date in format (dd/mm/yyyy): Sum of Start Date + Valid Period',
      valid_period: 'Period in months: Sum of Duration + Extended Term',
      extended_term_sdlanet: '1 month fixed value',
      valid_period_sdlanet: 'Period in months: Sum of Duration + Extended Term SDLANET',
      start_date_sdlanet: '2 dates in format (dd/mm/yyyy): Start Date + "to" + Sum of Start Date + Extended Term SDLANET',
      end_date_sdlanet: 'Date in format (dd/mm/yyyy): Sum of Start Date + Valid Period SDLANET',
    },

    email_body: {
      name: 'Customer Email Template',

      table: {
        description: 'License Type',
        template: 'Email Template',
        content: 'Content',
        active: 'Active',
        no_email_bodies: 'No email templates found',
      },

      modal: {
        title: 'Customer Email Template'
      }
    },

    general_settings: {
      name: 'Settings',

      tabs: {
        email_bodies: 'Customer Email Template',
        templates: 'License Template',
        terms: 'Terms and Conditions',
      }
    },

    errors: {
      obtaining_terms: 'Error obtaining terms and conditions',
      obtaining_license: 'Error obtaining license data',
      obtaining_license_template: 'Error obtaining license templates data',
      obtaining_types: 'Error obtaining types',
      sending_mail: 'Error sending email to client, license status does not allow sending',
      no_records: 'No records found',
      form_invalid: 'There are errors in the form',
      obtaining_email_bodies: 'Error obtaining email content',
    },

    success: {},

    pagination: {
      first: 'First',
      last: 'Last',
      next: 'Next',
      previous: 'Previous',
    },

    validation: {
      required: 'This field is required',
      minlength: 'Minimum of ${requiredLength} characters.',
      maxlength: 'Maximum of ${requiredLength} characters.',
      min: 'Minimum of ${min} characters.',
      email: 'Invalid email address',
      emailTaken: 'The email address is already being used by another user',
      pattern: {
        email: 'The value does not look like an email address',
        reg_exp: 'Pattern does not match',
      },
      other: 'Unhandled validation error: ${key}',
    },
  },

  es: {
    common: {
      button_accept: 'Aceptar',
      button_new: 'Nuevo',
      button_save: 'Guardar',
      client: 'Cliente',
      delete_license: 'Eliminar Licencia',
      footer: '©2025 Teldat Group',
      label_actions: 'Acciones',
      not: 'No',
      yes: 'Si',
      resend_license: 'Reenviar Licencia',
      select_all: 'Seleccionar Todos',
      send_license: 'Enviar Licencia',
      updated_success: 'Modificado satisfactoriamente',
      created_success: 'Creado satisfactoriamente',
    },

    navbar: {
      general_settings: 'Configuraciones',
      licenses: 'Licencias', // ← Referencia
      terms_conditions: 'Términos y Condiciones',
    },

    license: {
      download_license: 'Descargar Licencia',
      files: 'Archivos',
      invalid_file: 'Archivo inválido',
      name: 'Licencia',
      not_file: 'Archivo no encontrado',
      plural_name: 'Licencias',

      table: {
        client_email: 'Correo cliente',
        idmaterial: 'Número de pieza',
        order_position: 'Pedido posición',
        serial_number: 'Número de serie',
        serial_numbers: 'Números de serie',
        status: 'Estado',
        no_licenses: 'Sin licencias para descargar',
      },

      modal: {
        accept_terms: 'Acepta términos',
        general_information: 'Información General',
        mail_sent: 'Correo enviado',
        order: 'Pedido',
        po_position: 'PO/Posición',
        sent_success: 'Enviado satisfactoriamente',
        title: 'Datos de la licencia',
        tracking: 'Seguimiento',
        see_terms: 'Ver términos',
        material: 'Material',
        part_number: 'Número de pieza',
        serial_number: 'Número de serie',
        license_code: 'Código de licencia',
        number_of_licensed: 'Número de dispositivos con licencia',
        type: 'Licencias Servidor/Tipo',
        bundle: 'Paquete',
        downloaded: 'Descargado',
        pending_download: 'Pendiente para descargar',
      },
    },

    terms_condition: {
      name: 'Términos y Condiciones',
      table: {
        title: 'Título',
        description: 'Descripción',
        default: 'Predeterminado',
        available_download: 'Se puede descargar?',
      },

      modal: {
        default: 'Predeterminado',
        title: 'Términos y Condiciones',
        spanish_version: 'Versión en español',
        english_version: 'Versión en inglés',
      },
    },

    license_template: {
      name: 'Plantillas de licencia',
      
      table: {
        type: 'Tipo Licencia',
        title: 'Título',
        logo: 'Imagen del logo',
        content: 'Contenido',
        active: 'Activo',
        no_templates: 'No se encontraron plantillas'
      },

      modal: {
        title: 'Plantilla de licencia',
        keyword_title: 'Palabras clave',
        keyword_copied: 'Palabra clave copiada'
      }
    },

    keyword: {
      serial_number_bar_code: 'Código de barra del número de serie.',
      start_date: 'Fecha en formato (dd/mm/aaaa)',
      end_date: 'Fecha en formato (dd/mm/aaaa): Suma de la fecha de inicio + periodo válido',
      valid_period: 'Periodo en meses: Suma de la duración + plazo ampliado', 
      extended_term_sdlanet: 'Valor fijo de 1 mes', 
      valid_period_sdlanet: 'Periodo en meses: Suma de la duración + plazo ampliado SDLANET', 
      start_date_sdlanet: '2 fechas en formato (dd/mm/aaaa): Fecha de inicio + «hasta» + Suma de la fecha de inicio + Plazo ampliado SDLANET', 
      end_date_sdlanet: 'Fecha en formato (dd/mm/aaaa): Suma de la fecha de inicio + Periodo válido SDLANET', 
    },

    email_body: {
      name: 'Plantilla Correo Cliente',

      table: {
        description: 'Tipo Licencia',
        template: 'Plantilla de Correo Electrónico',
        content: 'Contenido',
        active: 'Activo',
        no_email_bodies: 'No se encontraron plantillas de correo electrónico',
      },

      modal: {
        title: 'Plantilla Correo Cliente'
      }
    },

    general_settings: {
      name: 'Configuraciones',

      tabs: {
        email_bodies: 'Plantilla Correo Cliente',
        templates: 'Plantillas Licencias',
        terms: 'Términos y Condiciones',
      }
    },

    errors: {
      obtaining_terms: 'Error obteniendo los términos y condiciones',
      obtaining_license: 'Error obteniendo datos de la licencia',
      obtaining_license_template: 'Error obteniendo datos de las plantillas de licencia',
      obtaining_types: 'Error obteniendo los tipos',
      sending_mail: 'Error enviando el correo al cliente, el estado de la licencia no permite el envío',
      no_records: 'No se encontraron registros',
      form_invalid: 'Tiene errores en el formulario',
      obtaining_email_bodies: 'Error obteniendo el contenido de correo electrónico',
    },

    success: {},

    pagination: {
      first: 'Primera',
      last: 'Última',
      next: 'Siguiente',
      previous: 'Anterior',
    },

    validation: {
      required: 'Este campo es requerido',
      minlength: 'Mínimo de ${requiredLength} caracteres.',
      min: 'Valor mínimo de ${min}',
      maxlength: 'Máximo de ${requiredLength} caracteres.',
      email: 'El valor ingresado no es un correo electrónico',
      emailTaken: 'El correo electrónico ya está siendo usado por otro usuario',
      pattern: {
        email: 'El valor ingresado no luce como un correo electrónico',
        reg_exp: 'Error de patrón contra expresión regular',
      },
      other: 'Error de validación no controlado: ${key}',
    },
  },
};
