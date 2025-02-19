"use server";
export async function searchUsers(formData: FormData) {
  // Enables Next.js Server Action
  const search = formData.get("search");
  const searchBy = formData.get("searchBy");
  console.log(search, searchBy);

  const res = await fetch(
    `http://127.0.0.1:8000/api/search-users?search=${search}&searchBy=${searchBy}`
  );
  const users = await res.json();
  console.log(users);
  return users;
}
