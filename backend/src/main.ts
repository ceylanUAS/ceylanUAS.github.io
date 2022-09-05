import Server from "./server";

if (require.main === module) {
    (async () => {
        const server = await Server.initServer(4000);
    })();
}
