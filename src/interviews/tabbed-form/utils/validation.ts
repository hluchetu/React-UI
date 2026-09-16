type ProfileValues = {
  name: string;
  age: string;
  email: string;
}

export type ProfileErrors = {
  name?: string;
  age?: string;
  email?: string;
};

export const validateProfile = (
  values: ProfileValues,
): ProfileErrors => {
  const errors: ProfileErrors = {};

  if (values.name.trim().length < 3) {
    errors.name = "Name must contain at least three characters.";
  }

  const age = Number(values.age);

  if (
    values.age.trim() === "" ||
    !Number.isInteger(age) ||
    age < 18
  ) {
    errors.age = "Age must be a whole number of at least 18.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
};
export type InterestsErrors = {
  interests?: string;
};

export const validateInterests = (
  interests: string[],
): InterestsErrors => {
  if (interests.length === 0) {
    return {
      interests: "Select at least one interest.",
    };
  }

  return {};
};
