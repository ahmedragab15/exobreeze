declare interface INavItems {
  name: string;
  href: string;
}

declare interface ActiveLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
}
interface IFormInput {
  placeholder: string;
  type: string;
  label: string;
}

declare interface ILoginInputs extends IFormInput {
  name: "email" | "password";
}

declare interface IRegisterInputs extends IFormInput {
  name: "name" | "email" | "password";
}

declare interface PollutionDay {
  id: string;
  label: string;
  color: string;
  bgColor: string;
  message: string;
}

declare interface WeatherDay {
  id: string;
  label: string;
  temp: string;
  realFeel?: string;
  wind?: string;
  sunrise?: string;
  pressure?: string;
  sunset?: string;
  humidity?: string;
  icon: "partly-cloudy" | "rainy" | "thunderstorm" | "cloudy" | "rainy-cloudy" | "snowy" | "foggy";
}
