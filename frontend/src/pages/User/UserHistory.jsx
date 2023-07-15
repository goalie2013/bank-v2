import NotFound from "../NotFound";
import { Title } from "./styles";

export default function UserHistory({ data }) {
  console.log("UserHistory Component");

  console.log("data", data);

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
