function CredentialsForm() {
  return (
    <form>
      <label>Email: </label>
      <input type="email" name="email" placeholder="Enter Email" />
      <label>Password</label>
      <input type="password" name="password" placeholder="Enter Password" />
      <button className="border-primary-50 border ml-2 px-4">Sign in</button>
    </form>
  );
}

export default CredentialsForm;
