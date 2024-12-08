
import './App.css'
import Table from "./components/Table.tsx";
import Header from "./components/Header.tsx";
import NewGameModal from "./components/newGameModal.tsx";

function App() {

  return (

      <main className=" min-h-screen mx-auto max-w-7xl px-2">
          <Header />
          <NewGameModal />
        <Table />
      </main>
  )
}

export default App
