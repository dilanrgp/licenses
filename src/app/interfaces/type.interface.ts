export interface ApiTypeResponse {
  data: Type[];
}

export interface Type {
  id:          number;
  description: string;
  template:    string;
  active:      boolean;
  created_at:  Date;
  updated_at:  Date;
  deleted_at:  null;
}
