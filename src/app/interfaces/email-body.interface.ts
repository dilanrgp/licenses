import { Link } from "./api-response.interface";

export interface ApiEmailBodiesResponse {
  current_page:   number;
  data: EmailBody[];
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

export interface ApiOneEmailBodyResponse {
  data: EmailBody;
}


export interface EmailBody {
    id:                number;
    description:        string;
    template:           string;
    content:            string;
    active:             boolean;
    created_at?:        Date;
    updated_at?:        Date;
    deleted_at?:        null;
}