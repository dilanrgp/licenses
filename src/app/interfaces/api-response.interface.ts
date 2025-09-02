import { LicenseTemplate } from "./license-template.interface";
import { License } from "./license.interface";
import { TermsAndConditions } from "./terms-conditions.interface";

export interface ApiResponse<T = License | TermsAndConditions | LicenseTemplate> {
  current_page:   number;
  data: T[];
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

export interface ApiSimpleResponse {
  success?: boolean;
  error?: ApiError;
  message?: string;  
  data?: License;         
}

export interface Link {
  url:    null | string;
  label:  string;
  active: boolean;
}

export interface ApiError {
  error: Error;
  code:  number;
}

export interface Error {
  message: string;
}

export interface Options {
  page?: number;
}


