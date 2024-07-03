import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { DogsContextProvider } from "./Providers/dogProvider";
import { useSection } from "./Hooks/providerHooks";

export function App() {
  const { activeSection } = useSection();

  const isCreatingDog = activeSection === "create";

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <DogsContextProvider>
        <Section
          label={
            !isCreatingDog && activeSection ? `Dogs: ${activeSection} dogs` : ""
          }
        >
          {!isCreatingDog && <Dogs />}
          {isCreatingDog && <CreateDogForm />}
        </Section>
      </DogsContextProvider>
    </div>
  );
}
