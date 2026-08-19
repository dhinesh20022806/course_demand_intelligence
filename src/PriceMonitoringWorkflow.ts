import { CourseSyncService, PriceAlertService } from "./CourseOrchestrator";

export class PriceMonitoringWorkflow {
  constructor() {}

  async processCourse(course) {
    try {
      const courseSync = new CourseSyncService();

      await courseSync.syncCourse(course);

      const priceAlert = new PriceAlertService();

      await priceAlert.sendPriceAlert(course);
    } catch (error) {
      console.log(error);
    }
  }
}
