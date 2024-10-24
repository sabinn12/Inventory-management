export interface Product{
    id: number;
    name: string;
    quantity: number;
    category: string;
  }


export interface EventLog {
  id: number;
  product_id: number;
  action: string;
  timestamp: Date;
  details?: string;
}
