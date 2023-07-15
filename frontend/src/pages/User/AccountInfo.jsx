import NotFound from "../NotFound";
import { Title } from "./styles";

export default function AccountInfo({ data }) {
  console.log("AccountInfo Component");

  console.log("data", data);

  return (
    <>
      <Title>Account Info</Title>
      {!data ? <NotFound /> : { data }}
      <h2>Account Info</h2>
      <ul>
        <li>Account #</li>
        <li>Router #</li>
        <li>Date Account Opened</li>
      </ul>
    </>
  );
}
