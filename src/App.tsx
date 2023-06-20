import { Suspense } from "react";
import "./App.css";
import DrawerAppBar from "./components/Navbar";
import { Posts } from "./components/Posts";

function App() {
  return (
    <Suspense>
      <DrawerAppBar />
      <Posts />
    </Suspense>
  );
}

export default App;
