import { Link } from "./api-response.interface";
import { Type } from "./type.interface";

export interface ApiLicenseTemplateResponse {
  current_page:   number;
  data: LicenseTemplate[];
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

export interface ApiOneLicenseTemplateResponse {
  data: LicenseTemplate;
}

export interface LicenseTemplate {
  id:         number;
  type_id:    number | null;
  title:      string;
  logo:       string;
  content:    string;
  active:     number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  type:       Type;
}



