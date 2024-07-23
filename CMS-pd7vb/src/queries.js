import { HttpError } from 'wasp/server'

export const getSchedules = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Schedule.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getAttendances = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Attendance.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getFees = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Fee.findMany({ where: { userId: context.user.id } });
}

export const getTransactions = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Transaction.findMany({
    where: {
      userId: context.user.id
    }
  });
}