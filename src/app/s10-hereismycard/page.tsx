"use client";
import RegisterForm from "./_components/RegisterForm";
import VisitingCard from "./_components/VisitingCard";
import DownloadableVisitingCard from "./_components/DownloadableVCard";

const Page = () => {
  return (
    <div className="grid grid-cols-2 items-center justify-center min-h-screen gap-8 p-4 py-2">
      <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4 py-2">
        <RegisterForm />
      </div>
      <div className="flex flex-row gap-8 p-4 py-2">
        <VisitingCard />
        <DownloadableVisitingCard />
      </div>
    </div>
  );
};

export default Page;
