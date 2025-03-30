import { PropsWithChildren } from "react";
import {
  Authenticator as AmplifyAuthenticator,
  ThemeProvider as AmplifyThemeProvider,
  Theme,
} from "@aws-amplify/ui-react";
import logo from "../assets/logo_banner.png";
export const Authenticator = ({ children }: PropsWithChildren) => {
  const theme: Theme = {
    name: "genesis",
    tokens: {
      colors: {
        primary: {
          10: "#f0f7fe",
          20: "#cce5fc",
          40: "#66b3f9",
          60: "#0078e8",
          80: "#005db5",
          100: "#004282"
        },
        neutral: {
          10: "#f5f5f5",
          20: "#e6e6e6",
          40: "#cccccc",
          60: "#999999",
          80: "#666666",
          100: "#333333"
        }
      },
      components: {
        button: {
          primary: {
            backgroundColor: "#0078e8",
            _hover: {
              backgroundColor: "#005db5"
            }
          }
        },
      }
    }
  };

  return (
    <AmplifyThemeProvider theme={theme}>
      <AmplifyAuthenticator
        variation="modal"
        signUpAttributes={["given_name", "family_name"]}
        formFields={{
          signIn: {
            username: {
              label: "Email",
              placeholder: "Enter your email",
            },
          },
          signUp: {
            username: {
              label: "Email",
              placeholder: "Enter your email",
            },
            given_name: {
              label: "First Name",
              placeholder: "Enter your first name",
            },
            family_name: {
              label: "Last Name",
              placeholder: "Enter your last name",
            },
          },
        }}
        components={{
          Header : () => <>
          <div style={{
            display: "flex",
            justifyContent: "center",
            background: "#fff",
            padding: "1rem",
            borderRadius: "1rem 1rem 0 0"
          }}>
            <img 
              src={logo} 
              alt="Stevens Blueprint Logo" 
              style={{ 
                maxWidth: "200px"
              }} 
            />
          </div></>, 
        }}
      >
        {children}
      </AmplifyAuthenticator>
    </AmplifyThemeProvider>
  );
};
