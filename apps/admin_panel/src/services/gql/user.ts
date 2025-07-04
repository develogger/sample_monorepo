export const UserIdSchema = gql`
  query GetUserId {
    Me {
      id
      ssn
      cell_number
      level
      created_at
      avatar
      full_name
      referral_id
      email
      vip_level
      personal_link {
        domain
      }
      addresses {
        id
      }
      data_status {
        kyc
        email
        personal
      }
    }
  }
`;

export const DeactivateTelegramSchema = gql`
  mutation DeactivateTelegram {
    resource: DeactivateTelegram
  }
`;

export const TimeSchema = gql`
  query GetNow {
    Time {
      current_time
    }
  }
`;

export const UserAnnouncementSchema = gql`
  query UserAnnouncement {
    UserAnnouncement {
      id
      title
      message
      url_title
      url
      created_at
    }
  }
`;

export const UserReturnToOldVersionSchema = gql`
  mutation ReturnToOldVersion($description: String!) {
    ReturnToOldVersion(description: $description)
  }
`;
