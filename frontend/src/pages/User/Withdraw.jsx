import SubmitButton from "../../components/Buttons/SubmitButton";

export default function Withdraw() {
  console.count("WITHDRAW");

  const handleSubmit = () => {
    console.log(handleSubmit);
  };

  return <SubmitButton handleClick={handleSubmit}>Log In</SubmitButton>;
}
