import { Dayjs } from 'dayjs';

export enum MessageSpeaker {
  Jessica = 'jessica',
  You = 'you',
}

export type Message = {
  audio: Blob;
  speaker: MessageSpeaker;
  time: Dayjs;
};
