export const UserNotificationSchema = gql`
  query GetUserNotification {
    Me {
      id
      email
      notification_preferences {
        type
        channels
      }
      social_info {
        type
        active
      }
      verifications {
        type
        verify
      }
    }
  }
`;

export const PreferencesEditMutationSchema = gql`
  mutation PreferencesEdit(
    $notification_preferences: [InputUserNotificationPreferencesType]
    $email: String
  ) {
    PreferencesEdit(notification_preferences: $notification_preferences, email: $email) {
      notification_preferences {
        type
        channels
      }
      email
    }
  }
`;
