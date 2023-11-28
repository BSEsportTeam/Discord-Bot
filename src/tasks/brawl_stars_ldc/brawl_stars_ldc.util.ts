import { BrawlStarsAnnouncementType } from "$core/tasks/brawl_stars_ldc/brawl_stars_ldc.type";
import { calculateDayOfCustomWeek, DayJS } from "$core/utils/function/dayjs";
import { REFERENCE_DATE } from "$core/tasks/brawl_stars_ldc/brawl_stars_ldc.const";

export const getCurrentAnnouncementType = (): BrawlStarsAnnouncementType | null => {
  const day = calculateDayOfCustomWeek(REFERENCE_DATE, DayJS(), 14);

  switch (day) {
    case 3:
    case 5:
    case 7:
      return BrawlStarsAnnouncementType.START_LDC;
    case 4:
    case 6:
    case 8:
      return BrawlStarsAnnouncementType.END_LDC;
    case 9:
    case 13:
      return BrawlStarsAnnouncementType.JDC;
    default:
      return null;
  }
};