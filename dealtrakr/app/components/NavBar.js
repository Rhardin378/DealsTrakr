import Link from "next/link";
const Navbar = () => {
  // if signed it show log out if logged out show sign in
  return (
    <nav className="navbar">
      <div className="d-flex justify-content-between container-fluid ">
        <Link href="/dashboard" className="navbar-brand">
          <span className="">DealsTrakr</span>
        </Link>
        <div>
          <Link className="navbar-nav nav-item" href="/">
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
