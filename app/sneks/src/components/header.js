import React from "react";
import { useNavigate } from "react-router-dom";

import TopNavigation from "@cloudscape-design/components/top-navigation";
import { Auth } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Header(props) {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const navigate = useNavigate();

  return (
    <TopNavigation
      identity={{
        href: "#",
        title: "Sneks",
      }}
      utilities={[
        {
          type: "button",
          text: "Link",
          href: "https://example.com/",
          external: true,
          externalIconAriaLabel: " (opens in a new tab)",
        },
        {
          type: "button",
          text: "toggle mode",
          onClick: () => {
            if (props.mode === "dark") {
              props.setMode("light");
            } else {
              props.setMode("dark");
            }
          },
        },
        ...(authStatus === "authenticated"
          ? [
              {
                type: "button",
                text: `${Auth.user.attributes.email}`,
                iconName: "user-profile",
              },
              {
                type: "button",
                variant: "primary-button",
                text: "Sign out",
                onClick: () => {
                  Auth.signOut();
                },
              },
            ]
          : [
              {
                type: "button",
                variant: "primary-button",
                text: "Sign in",
                onClick: () => {
                  navigate("/signin");
                },
              },
            ]),
      ]}
      i18nStrings={{
        searchIconAriaLabel: "Search",
        searchDismissIconAriaLabel: "Close search",
        overflowMenuTriggerText: "More",
        overflowMenuTitleText: "All",
        overflowMenuBackIconAriaLabel: "Back",
        overflowMenuDismissIconAriaLabel: "Close menu",
      }}
    />
  );
}
