import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="createaccount">Create Account</Link>
      </nav>
    </header>
  );
}
