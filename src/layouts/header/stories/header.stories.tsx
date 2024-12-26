import { StoryFn } from "@storybook/react";
import { Header } from "..";
import { Icons } from "@/components/icons";
import React from "react";

export default {
  title: "Layout/Header",
};

export const Default: StoryFn = () => {
  const [lang, setLang] = React.useState("EN");

  return (
    <>
      <Header
        user={{
          email: "gael.duong@railvision.ca",
        }}
        breadcrumbItems={[
          { label: "Via Rail", href: "/" },
          { label: "Trip Review", href: "/" },
        ]}
        userMenusItems={[
          {
            icon: <Icons.AdminPanel className="h-5 w-5 fill-current" />,
            label: "Admin",
            action: () => {},
          },
          {
            icon: <Icons.Logout className="h-5 w-5 fill-current" />,
            label: "Logout",
            action: () => {},
          },
        ]}
        currentLang={lang}
        langs={["EN", "FR"]}
        onLangChange={setLang}
      />
    </>
  );
};
