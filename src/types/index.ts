export interface Balance {
    employeeId: string;
    locationId: string;
    balance: number;
  }
  
  export interface RequestPayload {
    employeeId: string;
    locationId: string;
    daysRequested: number;
  }
  
  export interface RequestResponse {
    id: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
  }
  
  export interface SyncResponse {
    success: boolean;
    count?: number;
  }