// Initial state for the form
export const initialState = {
  //file value
  image: null,
  //String values
  studioName: "",
  jobTitle: "",
  jobLocation: "",
  jobSalary: "",
  imagePreview: "",
  studioIntro: "",
  jobQualification: "",
  jobQualificationTwo: "",
  jobQualificationThree: "",
  jobBenefit: "",
  jobBenefitTwo: "",
  jobBenefitThree: "",
  extraJobDetails: "",
  jobEmail: "",
  selectedTags: [],
  //Valid Bools
  isValidStudioName: false,
  isValidJobTitle: false,
  isValidJobLocation: false,
  isValidJobSalary: false,
  isValidImage: false,
  isValidStudioIntro: false,
  isValidExtraJobDetails: false,
  isValidJobEmail: false,
  //Step/Hide Bools
  nameStep: false,

  hideTitle: true,
  titleStep: false,

  hideLocation: true,
  locationStep: false,

  hideTags: true,
  tagsStep: false,

  hideJobSalary: true,
  jobSalaryStep: false,

  hideImage: true,
  imageStep: false,

  hideStudioIntro: true,
  studioIntroStep: false,

  hideJobBenefits: true,
  jobBenefitsStep: false,

  hideJobQualifications: true,
  jobQualificationsStep: false,

  hideExtraJobDetails: true,
  extraJobDetailsStep: false,

  hideJobEmail: true,
  jobEmailStep: false,

  hideJobSubmitButton: true,
};

// Reducer function
export function jobFormReducer(state, action) {
  switch (action.type) {
    case "nextStep":
      return { ...state, ...action.payload };
    case "updateField":
      return {
        ...state,
        [action.field]: action.value,
        [`isValid${
          action.field.charAt(0).toUpperCase() + action.field.slice(1)
        }`]: action.isValid,
      };
    case "addTag":
      return {
        ...state,
        selectedTags: [...state.selectedTags, action.payload],
      };
    case "removeTag":
      return {
        ...state,
        selectedTags: state.selectedTags.filter(
          (tag) => tag !== action.payload
        ),
      };

    default:
      throw new Error();
  }
}
