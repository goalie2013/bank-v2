import { useContext } from "react";
import NotFound from "../NotFound";
import { Title } from "../styles";
import { AuthContext } from "../../App";

export default function UserHistory({ data }) {
  console.log("UserHistory Component");

  console.log("data", data);

  const { handleSuccess } = useContext(AuthContext);

  useEffect(() => {
    handleSuccess();
  }, []);
  return (
    <>
      <Title>User History</Title>
      {!data ? <NotFound /> : { data }}
      <h2>Dashboard</h2>
      <ul>
        <li>interactive graph showing total money in account</li>
      </ul>
    </>
  );
}
