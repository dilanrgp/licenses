import { Link } from "./api-response.interface";

export interface ApiLicenseResponse {
  current_page:   number;
  data: License[];
  first_page_url: string;
  from:           number;
  last_page:      number;
  last_page_url:  string;
  links:          Link[];
  next_page_url:  string | null;
  path:           string;
  per_page:       number;
  prev_page_url:  string | null;
  to:             number;
  total:          number;
}

export interface License {
  id:                      number;
  selected?:               boolean;
  license_status_id:       number;
  license_status_name:     string;
  server:                  Server;
  client_email:            string;
  po:                      string;
  position:                string;
  planposition:            number;
  custorder:               string;
  quantity:                number;
  idmaterial:              string;
  material:                string;
  bundle:                  Bundle;
  serial_number:           string;
  pin_code:                string;
  start_date:              null;
  type:                    Type;
  typecnm:                 string;
  dpi:                     DPI;
  telemetry:               DPI;
  sent:                    boolean;
  sent_date:               Date | null;
  client_token:            string | null;
  accept_conditions:       boolean;
  accept_conditions_date:  Date | null;
  accept_conditions_ip:    null | string;
  generated_license:       boolean;
  generated_license_date:  Date | null;
  downloaded_license:      boolean;
  downloaded_license_date: null;
  created_sap:             string;
  duration:                null | string;
  created_at:              Date;
  updated_at:              Date | null;
  deleted_at:              null;
  license_file?:            LicenseFile[];
  license_terms_file:      string;
}

export enum Bundle {
  Bundle = "BUNDLE",
  Unitario = "UNITARIO",
}

export enum DPI {
  Empty = " ",
}

export enum Server {
  Ted = "TED",
}

export enum Type {
  Cloud = "Cloud",
}

export interface LicenseFile {
  id:              number;
  public_id:       string;
  license_id:      number;
  license_type_id: number;
  title:           string;
  description:     string;
  filename:        string;
  downloaded:      boolean;
  download_date:   null;
  download_ip:     null;
  created_at:      Date;
  updated_at:      Date | null;
  deleted_at:      Date | null;
}

export interface TableState<T> {
  items: T[];
  allSelected: boolean;
  selectedCount: number;
}
