export type CreateBusDto = {
    identity: string,
    available_row: number,
    available_col: number,
    available_backseat: number
}

export type CreateScheduleDto = {
    time: string,
    bus_id: string | number,
    route_id: string | number
}

export type UpdateScheduleDto = {
    time: string,
    bus_id: string | number,
    route_id: string | number,
    closed: boolean
}