import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Account extends Model {
    public id!: number;
    public email!: string;
    public firebaseUid!: string;
    public password!: string;
    public salt!: string;
    public first_name!: string;
    public last_name!: string;
    public phone!: string;
    public birthday!: Date;
    public created_at!: Date;
    public last_modified!: Date;
    public role!: string[];
}

Account.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    firebaseUid: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    salt: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    last_modified: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    role: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    },
}, {
    sequelize,
    modelName: 'Account',
    tableName: 'accounts',
    timestamps: false,
});

export default Account;
export type AccountInstance = InstanceType<typeof Account>;