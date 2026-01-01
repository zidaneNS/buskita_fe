export interface DefaultModel {
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Role extends DefaultModel {
  roleId: number;
  name: string;
}

export interface User extends DefaultModel {
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  roleId: number;
  creditScore: number;
  role?: Role;
}

export interface Schedule extends DefaultModel {
  scheduleId: string;
  time: Date;
  isClosed: false;
  busId: string;
  routeId: string;
  bus?: Bus;
  route?: Route;
  users?: User[];
}

export interface ScheduleCard extends Schedule {
  totalSeats: number;
  totalUser: number;
}

export interface Seat extends DefaultModel {
  seatId: string;
  busId: string;
  userId?: string;
  scheduleId: string;
  seatNumber: number;
  verified: boolean;
  bus?: Bus;
  user?: User;
  schedule?: ScheduleCard;
}

export interface Bus extends DefaultModel {
  busId: string;
  name: string;
  totalRow: number;
  totalCol: number;
  totalBackseat: number;
}

export interface Route extends DefaultModel {
  routeId: string;
  name: string;
}



export type SessionPayload = {
  token: string,
  expiresAt: Date
}

export type SignUpFormState = | {
  errors?: {
    nim_nip?: string[],
    name?: string[],
    email?: string[],
    phone_number?: string[],
    address?: string[],
    password?: string[],
    password_confirmation?: string[]
  },
  message?: string,
  success?: boolean
} | undefined

export type SignInFormState = | {
  errors?: {
    nim_nip?: string[],
    password?: string[]
  },
  message?: string,
  success?: boolean
} | undefined

export type BookSeatState = | {
  errors?: string,
  success?: boolean
} | undefined

export type CheckState = | {
  errors?: {
    cipher?: string[]
  },
  message?: string,
  success?: boolean
} | undefined

export type CreateBusState = | {
  errors?: {
    identity?: string[],
    available_row?: string[],
    available_col?: string[],
    available_backseat?: string[]
  },
  message?: string,
  success?: boolean
} | undefined

export type DestroyBusState = | {
  error?: string,
  success?: boolean
} | undefined

export type CreateScheduleState = | {
  errors?: {
    time?: string[],
    bus_id?: string[],
    route_id?: string[]
  },
  message?: string,
  success?: boolean
} | undefined

export type UpdateScheduleState = | {
  errors?: {
    time?: string[],
    bus_id?: string[],
    route_id?: string[],
    closed?: string[]
  },
  message?: string,
  success?: boolean
} | undefined

export type DeleteScheduleState = | {
  error?: string,
  success?: boolean
} | undefined

export type VerifyState = | {
  error?: string,
  success?: boolean,
  data?: Seat
} | undefined

export type UpdateProfileState = | {
  errors?: {
    nim_nip?: string[],
    name?: string[],
    email?: string[],
    phone_number?: string[],
    address?: string[],
  },
  message?: string,
  success?: boolean
} | undefined

export type GenerateEValuesState = {
  errors?: {
    pValue?: string[];
    qValue?: string[];
    total?: string[]
  },
  message?: string;
  success?: boolean;
  data?: GenerateEValuesResponse
} | undefined

export type GenerateKeyState = {
  errors?: {
    nValue?: string[];
    toitent?: string[];
    eValue?: string[];
  };
  message?: string;
  success?: boolean;
} | undefined

export type EncryptState = {
  errors?: {
    plaintext?: string[];
  };
  message?: string;
  data?: string;
  success?: boolean;
} | undefined

export type DecryptState = {
  errors?: {
    ciphertext?: string[];
  };
  message?: string;
  data?: string;
  success?: boolean;
} | undefined

export type GenerateEValuesResponse = {
  eValues: number[],
  nValue: number,
  toitent: number
}

export interface DefaultResponse<T> {
  statusCode: number;
  message: string;
  payloads?: {
    data: T
  }
}

export type PublicKey = {
  eValue: number;
  nValue: number;
}

export interface Plaintext {
  name: string;
  userId: string;
  time: Date;
  seatId: string;
  seatNumber: number;
  routeName: string;
}

export interface EncryptedSeat extends Seat {
  ciphertext: string;
}