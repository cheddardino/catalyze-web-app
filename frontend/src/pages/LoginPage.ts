export const LoginPage = () => {
  const handleSubmit = (event: Event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get('username');
    const password = formData.get('password');

    // Call the login API with the credentials
    // loginUser(username, password).then(response => {
    //   // Handle successful login
    // }).catch(error => {
    //   // Handle login error
    // });
  };

  return `
    <div class="login-page">
      <h1>Login</h1>
      <form onsubmit="handleSubmit(event)">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  `;
};