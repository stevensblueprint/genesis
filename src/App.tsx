import { Authenticator } from "./components/Authenticator"  
import "@aws-amplify/ui-react/styles.css"
import ProjectSelector from "./pages/ProjectSelector"
import ProjectForm from "./pages/ProjectForm"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <>
      <Authenticator>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProjectSelector />} />
            <Route path="/form" element={<ProjectForm />} />
          </Routes>
        </BrowserRouter>
      </Authenticator>
    </>
  )
}

export default App
