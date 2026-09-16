import type { InterestsErrors } from "../utils/validation";

type InterestProps = {
  interests: string[];
  onInterestsChange: (interests: string[]) => void;
  errors: InterestsErrors;
}

const options = ["Coding", "Music", "Sports"];

export const Interests = ({
  interests,
  onInterestsChange,
  errors,
}: InterestProps) => {
  const toggleInterest = (interest: string) => {
    const nextInterests = interests.includes(interest)
      ? interests.filter((item) => item !== interest)
      : [...interests,interest]

    onInterestsChange(nextInterests);
  }

  return (
    <fieldset aria-describedby={errors.interests ? "interests-error" : undefined}>
      <legend>Select your interests</legend>

      {
        options.map((interest) => (
          <label key={interest}>
            <input
              type="checkbox"
              checked={interests.includes(interest)}
              onChange = {()=>toggleInterest(interest)}
            />
            {interest}
          </label>
        ))
      }

      {errors.interests && (
        <p id="interests-error" role="alert">{errors.interests}</p>
      )}
    </fieldset>
  )
}
