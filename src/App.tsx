import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { DogsContextProvider } from "./Providers/dogProvider";
import { useSectionProvider } from "./Providers/sectionProvider";

export function App() {
  const { activeSection } = useSectionProvider();

  const isCreatingDog = activeSection === "create";

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <DogsContextProvider>
        <Section
          label={
            !isCreatingDog && activeSection
              ? `Dogs: ${
                  activeSection[0].toUpperCase() +
                  activeSection.substring(1).toLowerCase()
                } Dogs`
              : ""
          }
        >
          {!isCreatingDog && <Dogs />}
          {isCreatingDog && <CreateDogForm />}
        </Section>
      </DogsContextProvider>
    </div>
  );
}
