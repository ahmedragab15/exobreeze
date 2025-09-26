interface IFormInput {
  placeholder: string;
  type: string;
  label: string;
}

declare interface ILoginInputs extends IFormInput {
  name: "email" | "password";
}

declare interface IRegisterInputs extends IFormInput {
  name: "name" |  "email" | "password" ;
}
