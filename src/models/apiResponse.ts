// Api Response
export interface ApiResponse<T> {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string | null;
  total: number;
  items: T[]; // 제네릭
}
