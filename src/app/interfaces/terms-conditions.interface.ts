import { Link } from "./api-response.interface";

export interface ApiTermsResponse {
  current_page:   number;
  data: TermsAndConditions[];
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

export interface ApiOneTermResponse {
  data: TermsAndConditions;
}


export interface TermsAndConditions {
    id:                number;
    title_es:          string;
    description_es:    string;
    title_en:          string;
    description_en:    string;
    default?:           boolean;
    can_be_downloaded?: boolean;
    created_by?:        null;
    updated_by?:        null;
    deleted_by?:        null;
    created_at?:        Date;
    updated_at?:        Date;
    deleted_at?:        null;
}