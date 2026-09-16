import { useState } from "react";
import type { SubmitEvent } from "react";
import { TabNavigation } from "./components/TabNavigation";
import { Profile } from "./components/Profile";
import { Interests } from "./components/Interests";
import { Settings } from "./components/Settings";
import { validateProfile, validateInterests } from "./utils/validation";
import type { ProfileErrors, InterestsErrors } from "./utils/validation";

const tabs = ["Profile", "Interests", "Settings"];

type FormData = {
  name: string;
  age: string;
  email: string;
  interests: string[];
  theme: "light" | "dark";
  notifications: boolean;
};


export const TabbedForm =() => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    email: "",
    interests: [],
    theme: "light",
    notifications: false,
  });
  const [profileErrors, setProfileErrors] =useState<ProfileErrors>({});
  const [interestsErrors, setInterestsErrors] = useState<InterestsErrors>({});


  const updateField = <K extends keyof FormData>(
    field: K,
    value:FormData[K],
  ) => {
    setFormData((previous) => (
      {
        ...previous,
        [field]: value,
      }
    ))
  }

  const handleValidateProfile = () => {
    setProfileErrors(validateProfile(formData));
  };

  const handleTabChange = (nextTab: number) => {
    if (nextTab > activeTab) {
      const errors = validateProfile(formData);

      setProfileErrors(errors);

      if (Object.keys(errors).length > 0) {
        setActiveTab(0);
        return;
      }

      if (nextTab === 2) {
        const errors = validateInterests(formData.interests);
        setInterestsErrors(errors);

        if (Object.keys(errors).length > 0) {
          setActiveTab(1);
          return;
        }
      }
    }

    setActiveTab(nextTab);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const profileErrors = validateProfile(formData);
    const interestsErrors = validateInterests(formData.interests);

    setProfileErrors(profileErrors);
    setInterestsErrors(interestsErrors);

    if (Object.keys(profileErrors).length > 0) {
      setActiveTab(0);
      return;
    }

    if (Object.keys(interestsErrors).length > 0) {
      setActiveTab(1);
      return;
    }

    const payload = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      age: Number(formData.age),
    };

    console.log("Submitted form:", payload);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>User Preferences</h1>

      <TabNavigation
        tabs={tabs}
        onTabChange={handleTabChange}
        activeTab={activeTab}
      />

      <h2>{tabs[activeTab]}</h2>
      {activeTab === 0 && (
        <>
        <Profile
          email={formData.email}
          name={formData.name}
          age={formData.age}
          onNameChange={(value) => updateField("name", value)}
          onAgeChange={(value) => updateField("age", value)}
          onEmailChange={(value) => updateField("email", value)}
          errors={profileErrors}
          />

          <button type="button" onClick={handleValidateProfile}>
                Validate Profile
              </button>
        </>
      )
      }
      {activeTab === 1 && (
        <Interests
          interests={formData.interests}
          errors={interestsErrors}
          onInterestsChange={(value) => updateField("interests", value)}
        />
      )}
      {activeTab === 2 && (
        <Settings
          theme={formData.theme}
          notifications={formData.notifications}
          onThemeChange={(value) => updateField("theme", value)}
          onNotificationsChange={(value) =>
             updateField("notifications", value)
           }
        />
      )}
      {activeTab === 2 && (
        <button type="submit">Submit</button>
      )}
    </form>
  )
}
