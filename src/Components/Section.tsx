import { ReactNode } from "react";
import { useSectionProvider } from "../Providers/sectionProvider";
import { useDogsProvider } from "../Providers/dogProvider";
import { ActiveTab } from "../types";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { activeSection, setActiveSection } = useSectionProvider();
  const { dogsList } = useDogsProvider();

  const favoritedDogs = dogsList.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = dogsList.filter((dog) => !dog.isFavorite);

  const handleChangeSection = (sectionName: ActiveTab) => {
    const newTab = sectionName !== activeSection ? sectionName : "all";
    setActiveSection(newTab);
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${"active"}`}
            onClick={() => {
              handleChangeSection("favorited");
            }}
          >
            favorited ( {favoritedDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${""}`}
            onClick={() => {
              handleChangeSection("unfavorited");
            }}
          >
            unfavorited ( {unfavoritedDogs.length} )
          </div>
          <div
            className={`selector ${""}`}
            onClick={() => {
              handleChangeSection("create");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
