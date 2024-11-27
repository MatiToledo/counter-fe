export const ROLES_AND_SUBROLES_DICTIONARIES: Record<
  string,
  Record<string, string>
> = {
  partner: {
    partner: "Socio",
    admin: "Dueño",
  },
  user: {
    guardDoor: "Guardia Puerta",
    guardBar: "Guardia Pista",
  },
};

export const ALERTS_DICTIONARY = [
  { type: "DISTURBANCE", label: "Disturbios", color: "#D35400" },
  {
    type: "DRUNK_PERSON",
    label: "Persona en estado de ebriedad",
    color: "#7F8C8D",
  },
  {
    type: "REQUEST_ASSISTANCE",
    label: "Solicitud de ayuda de guardias",
    color: "#2980B9",
  },
  { type: "OVER_CAPACITY", label: "Capacidad excedida", color: "#8E44AD" },
  { type: "EXCESSIVE_VOLUME", label: "Volumen excedido", color: "#27AE60" },
  {
    type: "SUSPICIOUS_EMPLOYEE_BEHAVIOR",
    label: "Actitud sospechosa de empleado",
    color: "#F39C12",
  },
];
