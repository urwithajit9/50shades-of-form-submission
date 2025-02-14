import UserSearch from "./UserSearch";
import UserSearchWithEmailOrName from "./UserSearchEmailOrName";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <UserSearch />
      <UserSearchWithEmailOrName />
    </div>
  );
}
