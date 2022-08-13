import BoardingHousesTable from "../components/BoardingHousesTable";

export default function HomePageAdmin() {
  return (
    <>
      <div className="mt-20">
        <h1 className="text-6xl font-bold mb-5">Boarding House List</h1>
        <BoardingHousesTable />
      </div>
    </>
  );
}
