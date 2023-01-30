export enum EnReportStatus {
  Processing = 1,
  Failed = 2,
  Done = 3,
}

export enum EnReportType {
  Transactions = 0,
}

export enum EnReport {
  TIME_FORMAT = 'dd-MM-YYYY HH:mm:ss',
}

export enum EnReportNotification {
  FAILED = 'report_failed',
  COMPLETED = 'report_completed',
}
