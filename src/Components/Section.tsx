import { ReactNode } from "react";
import { useSectionProvider } from "../Providers/sectionProvider";
import { useDogsProvider } from "../Providers/dogProvider";
import { ActiveTab } from "../types";

export const Section = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const { activeSection, setActiveSection } = useSectionProvider();
  const { dogsList } = useDogsProvider();

  const favoritedDogs = dogsList.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = dogsList.filter((dog) => !dog.isFavorite);

  const toggleSection = (sectionName: ActiveTab) => {
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
            className={`selector ${
              activeSection === "favorited" ? "active" : ""
            }`}
            onClick={() => {
              toggleSection("favorited");
            }}
          >
            favorited ( {favoritedDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activeSection === "unfavorited" ? "active" : ""
            }`}
            onClick={() => {
              toggleSection("unfavorited");
            }}
          >
            unfavorited ( {unfavoritedDogs.length} )
          </div>
          <div
            className={`selector ${activeSection === "create" ? "active" : ""}`}
            onClick={() => {
              toggleSection("create");
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
