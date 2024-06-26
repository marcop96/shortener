export interface UrlEntity {
  long_url: string;
  short_url: string;
  url_id: string;
  creation_date: string;
  user_id: string | undefined;
  usage_count: number;
  qr_code: string;
  editable: boolean;
}
