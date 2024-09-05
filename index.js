import UserService from "./services/user.service.js";

async function startApp() {
  // start services
  await UserService.start();

  try {
    // simulate user creation
    const newUser = await UserService.call("user.createUser", {
      username: "mchibani",
      email: "mohamed.chibani@email.com",
    });
    console.log("New User Created", newUser);
    const users = await UserService.call("user.getUsers");
    console.log("All users", users);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await UserService.stop();
  }
}

startApp();
