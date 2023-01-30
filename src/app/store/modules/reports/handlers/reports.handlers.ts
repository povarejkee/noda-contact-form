import { EnReportStatus } from '../enums/reports.enums';
import { IReport } from '../interfaces/IReport';

export function isProcessingReport(report: IReport): boolean {
  return report.status === EnReportStatus.Processing;
}
