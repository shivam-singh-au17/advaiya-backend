import Account from "./Account";

const initializeDatabase = async () => {
    try {
        await Account.sync({ force: false });
        console.log("Tables synchronized successfully");
    } catch (error) {
        console.error("Error synchronizing tables:", error);
    }
};

export default initializeDatabase;
