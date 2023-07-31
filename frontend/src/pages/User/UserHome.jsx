import { useContext, useEffect } from "react";
import NotFound from "../NotFound";
import { PageWrapper, Title } from "../styles";
import { AuthContext } from "../../App";

export default function UserHome({ data }) {
  console.log("UserHome Component");

  console.log("data", data);
  const { name, email } = data;
  const { handleSuccess } = useContext(AuthContext);

  useEffect(() => {
    handleSuccess();
  }, []);

  return (
    <PageWrapper>
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
    </PageWrapper>
  );
}
