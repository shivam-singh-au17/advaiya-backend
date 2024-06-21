import { roles } from './roles';

const apisPermittedRoles = {
    USER: {
        GET_ACCOUNT: [roles.ADMIN, roles.USER],
        GET_ACCOUNTS: [roles.ADMIN],
        UPDATE_ACCOUNT: [roles.USER],
        DELETE_ACCOUNT: [roles.ADMIN],
    },
};

export default apisPermittedRoles;
