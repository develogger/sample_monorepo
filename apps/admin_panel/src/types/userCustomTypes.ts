import { UserAnnouncementType } from '@/graphql/graphql';

export interface UserAnnouncementTypeCustom extends UserAnnouncementType {
  isArchive: boolean;
}
