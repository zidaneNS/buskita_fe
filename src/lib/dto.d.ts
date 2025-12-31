export type CreateBusDto = {
    name: string;
    totalRow: number;
    totalCol: number;
    totalBackseat: number
}

export type CreateScheduleDto = {
    time: string,
    busId: string,
    routeId: string,
    isClosed: boolean,
}

export type UpdateProfileDto = {
    nim_nip: string,
    name: string,
    email: string,
    phone_number: string,
    address: string
}

export type CreateCoDto = {
    userId: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    phoneNumber: string;
    roleId: 1 | 2 | 3;
}

export type GenerateEvaluesDto = {
    pValue: number;
    qValue: number;
    total: number;
}

export type GenerateKeyDto = {
    nValue: number;
    toitent: number;
    eValue: number;
}