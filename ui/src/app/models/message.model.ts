import * as moment from 'moment';

export class Message {
  timestamp: moment.Moment;
  text: string;

  constructor(text: string, timestamp?: moment.Moment) {
    if (!timestamp) {
      timestamp = moment();
    }
    this.timestamp = timestamp;
    this.text = text;
  }
}
