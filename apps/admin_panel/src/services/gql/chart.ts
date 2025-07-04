export const TwoDayChartSchema = gql`
  query TwoDayChart($terminal_id: ID!, $date: Date!) {
    TwoDayChart(terminal_id: $terminal_id, date: $date) {
      other_day {
        date
        value
        count
      }
      today {
        date
        value
        count
      }
    }
  }
`;

export const BalanceChartSchema = gql`
  query BalanceChart($terminal_id: ID!) {
    BalanceChart(terminal_id: $terminal_id) {
      value
    }
  }
`;

export const FetchIncomeChartSchema = gql`
  query fetchIncomeChart($terminal_id: ID!) {
    IncomeChart(terminal_id: $terminal_id) {
      key
      data {
        date
        value
        count
      }
    }
  }
`;
