"use client";
// import RegisterForm from "./_components/RegisterForm";
import UserList from "./_components/UserList";
import UserDataList from "./_components/UserData";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {/* <RegisterForm /> */}
      <UserList />
      <UserDataList />
    </div>
  );
};

export default Page;
