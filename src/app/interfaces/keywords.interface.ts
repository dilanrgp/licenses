export interface ApiKeywordsResponse {
  data: Keyword[];
}

export interface Keyword {
  id:             number;
  keyword:        string;
  database_field: string;
  observation:    string;
  active:         boolean;
  order:          number;
  created_at?:     Date;
  updated_at?:     Date;
  deleted_at?:     null;
}
