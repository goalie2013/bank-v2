import { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import moneyBag from "../assets/money-bag.png";
import NavBarLoggedIn from "./NavBarLoggedIn";
import NavBarLoggedOut from "./NavBarLoggedOut";

// export default function NavBar({ id }) {
export default function NavBar() {
  const navigate = useNavigate();
  const { onLogin, onLogout } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const [loggedIn, setLoggedIn] = useState("none");
  const [email, setEmail] = useState("");
  let id;

  // console.log("NAVBAR ID", id);
  console.count("---NAVBAR---");
  console.log("loggedIn", loggedIn);

  useEffect(() => {
    // if (firebaseAuth.currentUser !== null) setLoggedIn(true);
  }, []);

  const style = {
    backgroundColor: "#89abe3ff",
    color: "#fcf6f5ff",
    minHeight: "9vh",
  };

  return (
    <>
      <Navbar
        variant="light"
        expand="md"
        expanded={expanded}
        className="p-3 navbar"
        style={style}
        zIndex={"1001"}
      >
        <Container>
          <Navbar.Brand>
            <Link
              to="/"
              style={style}
              onClick={() => setExpanded(false)}
              id={id}
            >
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <img
                  src={moneyBag}
                  className="img-fluid logo"
                  alt="Money Bag"
                  style={{
                    width: "2.5rem",
                    marginRight: "0.5rem",
                  }}
                />
              </span>
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            {loggedIn === "none" ? (
              <></>
            ) : loggedIn ? (
              <NavBarLoggedIn
                id={id}
                style={style}
                setExpanded={setExpanded}
                logout={onLogout}
              />
            ) : (
              <NavBarLoggedOut
                id={id}
                style={style}
                setExpanded={setExpanded}
                login={onLogin}
              />
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
