import { Authenticator } from "./components/Authenticator"  
import "@aws-amplify/ui-react/styles.css"
import { Button } from "antd"
import { useAuthenticator } from "@aws-amplify/ui-react"
import ProjectSelector from "./pages/ProjectSelector"

const App = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  return (
    <>
      <Authenticator>
        <ProjectSelector />
        <Button type="primary" onClick={signOut}>Logout</Button>
      </Authenticator>
    </>
  )
}

export default App
