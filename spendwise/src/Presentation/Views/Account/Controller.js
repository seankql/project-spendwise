export default function AccountController() {

  const formData1 = [
    { id: 1, key: "First Name", value: "Bob" },
    { id: 2, key: "Last Name", value: "Bobs" },
    { id: 3, key: "Email", value: "Bob@gmail.com" },
    { id: 4, key: "Member Since", value: "Apr 19, 2017" }
  ];

  const accountData1 = [
    { id: 1, key: "Account Number", value: "34564134" },
    { id: 2, key: "Account Name", value: "TD - 124905812" },
    { id: 3, key: "Active Since", value: "Apr 19, 2017" }
  ];

  const bankData1 = [
    { id: 1, key: "Institution", value: "TD" },
    { id: 2, key: "Linked Since", value: "June 25, 2017" }
  ];

  const accountData2 = [
    { id: 1, key: "Account Number", value: "8240214" },
    { id: 2, key: "Account Name", value: "RBC - 642129542" },
    { id: 3, key: "Active Since", value: "Sept 5, 2018" }
  ];

  const bankData2 = [
    { id: 1, key: "Institution", value: "RBC" },
    { id: 2, key: "Linked Since", value: "Sept 6, 2018" }
  ];

  // Would be an async function that calls controller
  function getBasicInfoUseCase() {
    return { result: formData1, error: null };
  }

  function getAccountsUseCase() {
    return { result: [accountData1, accountData2, bankData1, bankData2], error: null }
  }

  return {
    getBasicInfoUseCase,
    getAccountsUseCase,
  };
}
