import Card from "../components/Card/Card";
import ColorProvider from "../providers/ThemeProvider";

export default function Trial() {
  // const { token } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  console.log("token", token);

  return (
    <>
      {!token ? (
        <h1>Not Allowed</h1>
      ) : (
        <ColorProvider>
          <Card
            bgColor="cyan"
            title="My Title"
            body={
              <>
                <h1>TRIAL PAGE</h1>
                <h3>Token: {token}</h3>
              </>
            }
          ></Card>
        </ColorProvider>
      )}
    </>
  );
}
