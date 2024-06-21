import { Error as SequelizeError, WhereOptions } from 'sequelize';
import { APIError } from "../utils/errors";
import { INTERNAL_ERROR } from "../utils/status-codes";
import Account, { AccountInstance } from "../models/Account";
import admin from "../config/firebaseAdmin";
import { Op } from 'sequelize';

export class AccountRepository {
  async createAccount(payload: Partial<AccountInstance>): Promise<AccountInstance> {
    try {
      const account = await Account.create(payload);
      return account;
    } catch (err) {
      const sequelizeErr = err as SequelizeError;
      throw new APIError("Unable to create account", INTERNAL_ERROR, sequelizeErr.message);
    }
  }

  async findAccount(payload: WhereOptions<AccountInstance>): Promise<AccountInstance | null> {
    try {
      return await Account.findOne({ where: payload });
    } catch (err) {
      const sequelizeErr = err as SequelizeError;
      throw new APIError("Unable to find account", INTERNAL_ERROR, sequelizeErr.message);
    }
  }

  async createFirebaseUser(email: string, password: string): Promise<admin.auth.UserRecord> {
    try {
      const userRecord = await admin.auth().createUser({ email, password });
      return userRecord;
    } catch (error: any) {
      throw new APIError("Unable to create Firebase user", INTERNAL_ERROR, error.message);
    }
  }

  async findFirebaseUserByEmail(email: string): Promise<admin.auth.UserRecord | null> {
    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      return userRecord;
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        return null;
      }
      throw new APIError("Unable to find Firebase user", INTERNAL_ERROR, error.message);
    }
  }

  async findAccountById(id: number): Promise<AccountInstance | null> {
    try {
      return await Account.findByPk(id);
    } catch (err) {
      const sequelizeErr = err as SequelizeError;
      throw new APIError("Unable to find account", INTERNAL_ERROR, sequelizeErr.message);
    }
  }

  async updateAccount(id: number, account: Partial<AccountInstance>): Promise<AccountInstance | null> {
    try {
      const [affectedCount] = await Account.update(account, { where: { id }, returning: true });
      if (affectedCount === 0) {
        return null;
      }
      return await Account.findByPk(id);
    } catch (err) {
      const sequelizeErr = err as SequelizeError;
      throw new APIError("Unable to update account", INTERNAL_ERROR, sequelizeErr.message);
    }
  }

  async deleteAccount(id: number): Promise<AccountInstance | null> {
    try {
      const account = await Account.findByPk(id);
      if (!account) {
        return null;
      }
      await account.destroy();
      return account;
    } catch (err) {
      const sequelizeErr = err as SequelizeError;
      throw new APIError("Unable to delete account", INTERNAL_ERROR, sequelizeErr.message);
    }
  }

  async deleteFirebaseUser(firebaseUid: string): Promise<boolean> {
    try {
      await admin.auth().deleteUser(firebaseUid);
      return true;
    } catch (err) {
      const error = err as Error;
      throw new APIError("Unable to delete Firebase user", INTERNAL_ERROR, error.message);
    }
  }

  async getAllAccounts(options: { page: number, limit: number, sortBy: string, sortOrder: string, search: string }): Promise<{ data: AccountInstance[], count: number }> {
    try {
      const { page, limit, sortBy, sortOrder, search } = options;
      const offset = (page - 1) * limit;

      const where: WhereOptions<AccountInstance> = search
        ? {
          [Op.or]: [
            { first_name: { [Op.iLike]: `%${search}%` } },
            { last_name: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } }
          ]
        }
        : {};

      const { rows, count } = await Account.findAndCountAll({
        where,
        order: [[sortBy, sortOrder.toUpperCase()]],
        limit,
        offset
      });

      return { data: rows, count };
    } catch (err) {
      const sequelizeErr = err as SequelizeError;
      throw new APIError("Unable to get accounts", INTERNAL_ERROR, sequelizeErr.message);
    }
  }

}