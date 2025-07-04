import { ClientService } from '@zarindesk/js-sdk';
import axios from 'axios';

export const useTicketSdk = () => {
  const client = axios.create({});
  const runTimeConfig = useRuntimeConfig();
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };
  const gqlUrlEndUser =
    process.env.NODE_ENV === 'development'
      ? '/api/zarindesk/graphql/api'
      : `${runTimeConfig.public.zarin_desk_url}api/zarindesk/graphql/api`;
  const gqlUrlClient =
    process.env.NODE_ENV === 'development'
      ? '/api/zarindesk/graphql'
      : `${runTimeConfig.public.zarin_desk_url}api/zarindesk/graphql`;
  const directUrl =
    process.env.NODE_ENV === 'development'
      ? '/api/zarindesk'
      : `${runTimeConfig.public.zarin_desk_url}api/zarindesk`;
  const service = new ClientService(client, gqlUrlEndUser, config, directUrl, gqlUrlClient);

  return {
    service,
  };
};
