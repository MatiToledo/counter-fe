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
  {
    type: "DISTURBANCE_AT_DOOR",
    label: "Disturbios en puerta",
    color: "#A0522D",
  },
  {
    type: "DISTURBANCE_AT_BAR",
    label: "Disturbios en pista",
    color: "#8B4513",
  },
  {
    type: "DRUNK_PERSON",
    label: "Persona en estado de ebriedad",
    color: "#2F4F4F",
  },
  {
    type: "ADDITIONAL_HELP",
    label: "Necesidad de ayuda adicional",
    color: "#556B2F",
  },
  {
    type: "AUTHORITIES_INTERVENTION",
    label: "Intervención de autoridades",
    color: "#708090",
  },
  {
    type: "REQUEST_ASSISTANCE",
    label: "Solicitud de ayuda de guardias",
    color: "#4682B4",
  },
  {
    type: "OVER_CAPACITY",
    label: "Capacidad excedida",
    color: "#6A5ACD",
  },
  {
    type: "EXCESSIVE_VOLUME",
    label: "Volumen excedido",
    color: "#8FBC8F",
  },
  {
    type: "SUSPICIOUS_EMPLOYEE_BEHAVIOR",
    label: "Actitud sospechosa de empleado",
    color: "#D2B48C",
  },
];
