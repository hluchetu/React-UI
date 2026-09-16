import type { ProfileErrors } from "../utils/validation";

type ProfileProp = {
  name: string;
  age: string;
  email: string;
  onEmailChange: (email: string) => void;
  onAgeChange: (age: string) => void;
  onNameChange: (name: string) => void;
  errors: ProfileErrors;
}

export const Profile = ({ name, onNameChange, age, onAgeChange, email, onEmailChange,errors}: ProfileProp) => {
  return (
    <div>
      <label htmlFor = "name">
        name
      </label>
      <input
        id="name"
        type="text"
        value={name}
        aria-invalid={Boolean(errors.name)}
        aria-describedby={errors.name ? "name-error" : undefined}
        onChange={(event) => onNameChange(event.target.value)}
      />
      {errors.name && <p id="name-error" role="alert">{errors.name}</p>}

      <label htmlFor="age">age</label>
      <input
        id="age"
        type="number"
        value={age}
        aria-invalid={Boolean(errors.age)}
        aria-describedby={errors.age ? "age-error" : undefined}
        onChange = {(event) => onAgeChange(event.target.value)}
      >

      </input>
      {errors.age && <p id="age-error" role="alert">{errors.age}</p>}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        aria-invalid={Boolean(errors.email)}
        aria-describedby={errors.email ? "email-error" : undefined}
        onChange={(event) => onEmailChange(event.target.value)}
      />
      {errors.email && <p id="email-error" role="alert">{errors.email}</p>}
    </div>
  )
}
