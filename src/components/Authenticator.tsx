import { PropsWithChildren } from "react";
import {
  Authenticator as AmplifyAuthenticator,
  ThemeProvider as AmplifyThemeProvider,
  Theme,
} from "@aws-amplify/ui-react";

export const Authenticator = ({ children }: PropsWithChildren) => {
  const theme: Theme = {
    name: "genesis",
  };

  return (
    <AmplifyThemeProvider theme={theme}>
      <AmplifyAuthenticator
        variation="modal"
        signUpAttributes={["given_name", "family_name"]}
      >
        {children}
      </AmplifyAuthenticator>
    </AmplifyThemeProvider>
  );
};
