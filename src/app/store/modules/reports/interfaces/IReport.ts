export interface IReport {
  type: number;
  requestTime: string;
  completionTime: string;
  status: number; //* EnReportStatus
  url: string;
  id: string;
}
