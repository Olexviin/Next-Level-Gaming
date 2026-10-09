export type ServiceCategory = "package" | "experience";

export interface GamingService {
  id: string;
  name: string;
  price: string;
  type: ServiceCategory;
}

export const SERVICES: GamingService[] = [
  { id: "1", name: "Ultimate Gamer Pass", price: "R 150/hr", type: "package" },
  {
    id: "2",
    name: "VIP Gaming Experience",
    price: "R 250/hr",
    type: "package",
  },
  { id: "3", name: "E-Sports Training", price: "R 200/hr", type: "package" },
  { id: "4", name: "VR Solo", price: "R 100/hr", type: "experience" },
  { id: "5", name: "Sim Racing", price: "R 120/hr", type: "experience" },
];
