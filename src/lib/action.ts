import 'server-only';

import { verifySession } from "./dal";
import { CreateBusDto, CreateScheduleDto, GenerateEvaluesDto, UpdateProfileDto } from "./dto";
import { DefaultResponse, GenerateEValuesResponse } from "./type";
import { Bus } from "./type/bus";
import { Route, Schedule, ScheduleCard } from "./type/schedule";
import { Seat } from "./type/seat";
import { User } from "./type/user";

const baseUrl = process.env.BASE_URL;

export const getSchedules = async () => {
  const session = await verifySession();
  const { token } = session!;

  try {
    const response = await fetch(`${baseUrl}/schedules`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await response.json() as DefaultResponse<ScheduleCard[]>;
    if (result.payloads?.data) {
      return result.payloads.data
    } else {
      console.log('failed fetching schedules', response);
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

export const getSeatsBySchedule = async (id: string | number) => {
  const session = await verifySession();
  const { token } = session!;

  try {
    const response = await fetch(`${baseUrl}/seats/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await response.json() as DefaultResponse<Seat[]>;
    if (result.payloads?.data) {
      return result.payloads.data
    } else {
      console.log('failed fetch seats', response);
      return null;
    }
  } catch (err) {
    console.log('failed fetch seats', err);
    return null;
  }
}

export const getBusBySchedule = async (id: string | number) => {
  const session = await verifySession();
  const { token } = session!;
  try {
    const response = await fetch(`${baseUrl}/buses/schedule/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await response.json() as DefaultResponse<Bus>;
    if (result.payloads?.data) {
      return result.payloads.data
    } else {
      console.log('failed fetch bus by schedule', response.status);
      return null
    }
  } catch (err) {
    console.log('failed fetch bus by schedule', err);
    return null;
  }
}

export const getScheduleById = async (id: string | number) => {
  const session = await verifySession();
  const { token } = session!;

  try {
    const response = await fetch(`${baseUrl}/schedules/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    const result = await response.json() as DefaultResponse<ScheduleCard>;
    if (result.payloads?.data) {
      return result.payloads.data
    } else {
      console.log('failed fetch schedule by id', response.status);
      return null
    }
  } catch (err) {
    console.log('failed fetch schedule by id', err);
    return null;
  }
}

export const getUserSchedule = async () => {
  const session = await verifySession();
  const { token } = session!;

  try {
    const response = await fetch(`${baseUrl}/schedules/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await response.json() as DefaultResponse<ScheduleCard[]>
    if (result.payloads?.data) {
      return result.payloads.data
    } else {
      console.log('fail fetch user schedule', response.status);
      return null;
    }
  } catch (err) {
    console.log('fail fetch user schedule', err);
    return null;
  }
}

export const attachSeat = async (seat_id: string | number): Promise<DefaultResponse<Seat>> => {
  const session = await verifySession();
  const { token } = session!;

  try {
    const response = await fetch(`${baseUrl}/seats/attach/${seat_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await response.json() as DefaultResponse<Seat>;
    return result;
  } catch (err) {
    console.log('fail book seat', err);
    return { message: 'something went wrong', statusCode: 500 }
  }
}

export const updateSeat = async (seat_id: string | number, new_seat_id: string | number): Promise<DefaultResponse<Seat>> => {
  const session = await verifySession();
  const { token } = session!;

  try {
    const response = await fetch(`${baseUrl}/seats/${seat_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        seatId: new_seat_id
      })
    });

    const result = await response.json() as DefaultResponse<Seat>;
    return result;
  } catch (err) {
    console.log('fail update seat', err);
    return { message: 'something went wrong', statusCode: 500 }
  }
}

export const detachSeat = async (id: number | string): Promise<DefaultResponse<null>> => {
  const session = await verifySession();
  const { token } = session!;

  try {
    const response = await fetch(`${baseUrl}/seats/detach/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await response.json() as DefaultResponse<null>;
    return result;
  } catch (err) {
    console.log('fail detach seat', err);
    return { message: 'something went wrong', statusCode: 500 }
  }
}

export const getUserById = async (id: string | number) => {
  const session = await verifySession();
  const { token } = session!;

  try {
    const response = await fetch(`${baseUrl}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      const user = await response.json();
      return user as User;
    } else {
      const result = await response.json();
      console.log('fail get user by id : ', result.error);
      return { error: result.error || result.message as string }
    }
  } catch (err) {
    console.log('fail get user by id', err);
    return { error: 'something went wrong' }
  }
}

export const getSeatById = async (id: number | string) => {
  const session = await verifySession();
  const { token } = session!;

  try {
    const response = await fetch(`${baseUrl}/seats/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      const seat = await response.json();
      return seat as Seat;
    } else {
      const result = await response.json();
      console.log('fail get seat by id : ', result.error || result.message);
    }
  } catch (err) {
    console.log('fail get seat by id', err);
  }
}

export const getAllBuses = async () => {
  const session = await verifySession();
  const { token } = session!;

  try {
    const response = await fetch(`${baseUrl}/buses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await response.json() as DefaultResponse<Bus[]>;
    if (result.payloads?.data) {
      return result.payloads.data;
    } else {
      const result = await response.json();
      console.log('fail get all buses : ', result.error || result.message);
    }
  } catch (err) {
    console.log('fail get all buses ', err);
  }
}

export const createBus = async (createBusDto: CreateBusDto): Promise<DefaultResponse<Bus>> => {
  const session = await verifySession();
  const { token } = session!;

  try {
    const response = await fetch(`${baseUrl}/buses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(createBusDto)
    });

    const result = await response.json() as DefaultResponse<Bus>;
    return result;

  } catch (err) {
    console.log('fail create bus', err);
    return { message: 'something went wrong', statusCode: 500 }
  }
}

export const destroyBus = async (id: number | string): Promise<DefaultResponse<null>> => {
  const session = await verifySession();
  const { token } = session!;

  try {
    const response = await fetch(`${baseUrl}/buses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await response.json() as DefaultResponse<null>;
    return result;
  } catch (err) {
    console.log('fail destroy bus', err);
    return { message: 'something went wrong', statusCode: 500 };
  }
}

export const updateBus = async (id: number | string, updateBusDto: CreateBusDto): Promise<DefaultResponse<Bus>> => {
  const session = await verifySession();
  const { token } = session!;

  try {
    const response = await fetch(`${baseUrl}/buses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(updateBusDto)
    });

    const result = await response.json() as DefaultResponse<Bus>;
    return result;
  } catch (err) {
    console.log('fail update bus', err);
    return { message: 'something went wrong', statusCode: 500 }
  }
}

export const getRoutes = async () => {
  const session = await verifySession();
  const { token } = session!;

  try {
    const response = await fetch(`${baseUrl}/routes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await response.json() as DefaultResponse<Route[]>;
    if (result.payloads?.data) {
      return result.payloads.data;
    } else {
      const result = await response.json();
      console.log('fail get all routes', result.error);
    }
  } catch (err) {
    console.log('fail get all routes', err);
  }
}

export const storeSchedule = async (createScheduleDto: CreateScheduleDto): Promise<DefaultResponse<Schedule>> => {
  const session = await verifySession();
  const { token } = session!

  try {
    const response = await fetch(`${baseUrl}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(createScheduleDto)
    });

    const result = await response.json() as DefaultResponse<Schedule>;
    return result;
  } catch (err) {
    console.log('fail store schedule', err);
    return { message: 'something went wrong', statusCode: 500 };
  }
}

export const updateSchedule = async (updateScheduleDto: CreateScheduleDto, id: string | number): Promise<DefaultResponse<Schedule>> => {
  const session = await verifySession();
  const { token } = session!

  try {
    const response = await fetch(`${baseUrl}/schedules/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(updateScheduleDto)
    });

    const result = await response.json() as DefaultResponse<Schedule>

    return result;
  } catch (err) {
    console.log('fail update schedule', err);
    return { message: 'something went wrong', statusCode: 500 };
  }
}

export const destroySchedule = async (id: string | number): Promise<DefaultResponse<null>> => {
  const session = await verifySession();
  const { token } = session!;

  try {
    const response = await fetch(`${baseUrl}/schedules/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await response.json() as DefaultResponse<null>;
    return result;

  } catch (err) {
    console.log('fail destroy schedule', err);
    return { message: 'something went wrong', statusCode: 500 }
  }
}

export const getAllUsers = async () => {
  const session = await verifySession();
  const { token } = session!;

  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: "GET",
      headers: {
        "Content_Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await response.json() as DefaultResponse<User[]>;
    if (result.payloads?.data) {
      return result.payloads.data
    } else {
      console.log('fail get all users', result.message);
    }
  } catch (err) {
    console.log('fail get all users', err);
  }
}

export const verify = async (id: string | number) => {
  const session = await verifySession();
  const { token } = session!;

  try {
    const response = await fetch(`${baseUrl}/seats/${id}/verify`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      return { success: true }
    } else {
      const result = await response.json();
      console.log('fail verify passenegr', result.error || result.message);
      return { error: result.error || result.message as string };
    }
  } catch (err) {
    console.log('fail verify', err);
    return { error: 'something went wrong' };
  }
}

export const updateProfile = async (updateProfileDto: UpdateProfileDto, id: number | string) => {
  const session = await verifySession();
  const { token } = session!;

  try {
    const response = await fetch(`${baseUrl}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(updateProfileDto)
    });

    if (response.status === 200) {
      return { success: true }
    } else {
      const result = await response.json();
      console.log('fail update profile', result.error || result.message);
      return { error: result.error || result.message }
    }
  } catch (err) {
    console.log('fail update profile', err);
    return { error: 'something went wrong' }
  }
}

export const generateEvaluesReq = async (generateEValuesDto: GenerateEvaluesDto): Promise<DefaultResponse<GenerateEValuesResponse>> => {
  try {
    const response = await fetch(`${baseUrl}/rsa`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(generateEValuesDto)
    });

    const result = await response.json() as DefaultResponse<GenerateEValuesResponse>;
    return result
  } catch (err) {
    console.error('fail generate e values', err);
    return { message: 'something went wrong', statusCode: 500 }
  }
}