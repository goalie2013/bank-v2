import NotFound from "../NotFound";
import { Title } from "./styles";

export default function UserHome({ data }) {
  console.log("UserHome Component");

  console.log("data", data);
  const { name, email } = data;

  return (
    <>
      <Title className="home">USER HOME</Title>
      {!data ? (
        <NotFound />
      ) : (
        <div>
          {name}, {email}
        </div>
      )}
      <hr />
      <ul>
        <li>
          Header: All, Deposit & Withdraw, so can filter by transaction type
        </li>
        <li>Filter by time (ie last month) or by # (last 20 transactions)</li>
        <li>EXTRA: Sort by most expensive transactions</li>
        <li>
          ?? Clickable -- Slide-down that shows more info (date/time,
          ?transaction id?, ) ??{" "}
        </li>
      </ul>
    </>
  );
}
