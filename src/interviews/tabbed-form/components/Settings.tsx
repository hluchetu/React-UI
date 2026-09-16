type SettingsProps = {
  theme: "light" | "dark";
  onThemeChange: (theme: "light" | "dark") => void;
  notifications: boolean;
  onNotificationsChange: (notifications: boolean) => void;
}

export const Settings = ({
  theme,
  onThemeChange,
  notifications,
  onNotificationsChange,
}: SettingsProps) => {
  return (
    <div>
    <fieldset>
      <legend>Choose your theme</legend>

      <label>
        <input
          type="radio"
          name="theme"
          value="light"
          checked={theme === "light"}
          onChange = {() =>onThemeChange("light")}
        />
      </label>
      <label>
        <input
          type="radio"
          name="theme"
          value="dark"
          checked={theme === "dark"}
          onChange = {() =>onThemeChange("dark")}
        />
      </label>
      </fieldset>

      <label>
             <input
               type="checkbox"
               checked={notifications}
               onChange={(event) =>
                 onNotificationsChange(event.target.checked)
               }
             />
             Enable notifications
      </label>
      </div>
  )
}
