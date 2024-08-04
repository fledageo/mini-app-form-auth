import "./globals.css"

export default async function Home() {

  
  return (
    <>
      <div className="box main">
        <div className="box wrapper">
          <span className="subtitle is-3">Create Account</span>
          <div className="link">
            <a className="navbar-item button" href="user/signUp">
              SIGN UP
            </a>
          </div>
          <span className="subtitle is-3 mt-6">Already have an account?</span>
          <div className="link">
            <a className="navbar-item button" href="user/signIn">
              SIGN IN
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
