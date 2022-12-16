import React, { useState } from "react";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import Toggle from "@cloudscape-design/components/toggle";
import { applyMode, Mode } from "@cloudscape-design/global-styles";
import { Auth } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

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
        ...(authStatus === "authenticated"
          ? [
              {
                type: "button",
                text: `${Auth.user.username} (${Auth.user.attributes.email})`,
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
    >
      <Toggle>asdf</Toggle>
    </TopNavigation>
  );
};