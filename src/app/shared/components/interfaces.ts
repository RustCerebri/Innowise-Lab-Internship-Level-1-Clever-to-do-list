import { Time } from "@angular/common";

export interface User {
  email: string,
  password: string,
  returnSecureToken: boolean
}

export interface FbAuthResponse {
  idToken: string,
  expiresIn: string
}

export interface Task {
  id?: string,
  title: string,
  description: string,
  date: string,
  time: Time,
  autorId: string

}

export interface FbCreateResponse {
  name: string
}

export interface Params {
  id: string;
}

export interface CalDate {
  currentDate: Date,
  month: Date,
  day: string,
  week: string
}
