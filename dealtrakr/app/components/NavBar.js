import Link from "next/link";
const Navbar = () => {
  // if signed it show log out if logged out show sign in
  return (
    <nav>
      <ul>
        <li>DealsTrakr</li>
        <Link href="/">
          <li>Sign In</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
