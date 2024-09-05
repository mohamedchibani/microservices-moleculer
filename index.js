import UserService from "./services/user.service.js";
import EmailService from "./services/email.service.js";
import AuthService from "./services/auth.service.js";

async function startApp() {
  // start services
  await UserService.start();
  await EmailService.start();
  await AuthService.start();

  try {
    // simulate user creation
    const newUser = await UserService.call("user.createUser", {
      username: "admin",
      email: "mohamed.chibani@email.com",
    });
    console.log("New User Created", newUser);
    const users = await UserService.call("user.getUsers");
    console.log("All users", users);

    // simulate sending email
    const emailResult = await EmailService.call("email.sendEmail", {
      recipient: newUser.email,
      subject: "Welcome to the plateform!",
      content: "thank you for signing up",
    });
    console.log(emailResult);

    // simulate auth
    const authResult = await AuthService.call("auth.authUser", {
      username: newUser.username,
      password: "password",
    });

    console.log("Auth result:", authResult);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await UserService.stop();
    await EmailService.stop();
    await AuthService.stop();
  }
}

startApp();
