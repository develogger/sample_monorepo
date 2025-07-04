/* eslint-disable */
import axios from 'axios';
import centrifuge from 'centrifuge';

export default class broadcast {
  centrifuge: any;
  constructor() {
    this.centrifuge = new centrifuge(`wss://next.zarinpal.com/connection/websocket`, {
      refreshEndpoint: '/api/broadcasting/refresh',
      subscribeEndpoint: '/api/broadcasting/auth',
    });
    axios
      .post('/api/broadcasting/refresh')
      .then(response => {
        if (!response.data.token) return;
        this.centrifuge.setToken(response.data.token);
        this.centrifuge.connect();
      })
      .catch(err => {
        console.error(err);
      });
  }
  subscribe(event: any, callback: any) {
    return this.centrifuge.subscribe && this.centrifuge.subscribe(event, callback);
  }
}
