export const dynamic = "force-dynamic"; //? it will disabled the caching and it will make at a dynamic component
async function Dashboard() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  console.log("Render!!!");

  return <div>Dashboard</div>;
}

export default Dashboard;
