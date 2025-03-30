import { Authenticator } from "./components/Authenticator"  
import "@aws-amplify/ui-react/styles.css"
import { Button } from "antd"
import { useAuthenticator } from "@aws-amplify/ui-react"

const App = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  return (
    <>
      <Authenticator>
        Book
        <Button type="primary" onClick={signOut}>Logout</Button>
      </Authenticator>
    </>
  )
}

export default App
