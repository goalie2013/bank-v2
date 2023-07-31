import SubmitButton from "../../components/Buttons/SubmitButton";

export default function Deposit() {
  console.count("DEPOSIT");

  const handleSubmit = () => {
    console.log(handleSubmit);
  };

  return <SubmitButton handleClick={handleSubmit}>Log In</SubmitButton>;
}
