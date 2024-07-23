import { HttpError } from 'wasp/server'

export const createSchedule = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.Schedule.create({
    data: {
      user: { connect: { id: context.user.id } }
    }
  });
}

export const markAttendance = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Attendance.create({
    data: {
      userId: context.user.id,
      ...args
    }
  });
}

export const payFee = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.Fee.create({
    data: {
      user: { connect: { id: context.user.id } },
      // Add other fee payment details from args
    }
  });
}

export const makeTransaction = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Transaction.create({
    data: {
      user: { connect: { id: context.user.id } },
      amount: args.amount,
      description: args.description
    }
  });
}