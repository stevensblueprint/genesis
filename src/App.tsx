import { Authenticator } from "./components/Authenticator";
import "@aws-amplify/ui-react/styles.css";
import ProjectSelector from "./pages/ProjectSelector";
import ViteForm from "./pages/ViteForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./pages/Table";

const App = () => {
  return (
    <>
      <Authenticator>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProjectSelector />} />
            <Route path="/vite_form" element={<ViteForm />} />
            <Route path="/deployments" element={<Table />} />
          </Routes>
        </BrowserRouter>
      </Authenticator>
    </>
  );
};

export default App;
