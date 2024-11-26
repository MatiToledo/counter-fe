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
  { type: "DISTURBANCE", label: "Disturbios" },
  { type: "DRUNK_PERSON", label: "Persona en estado de ebriedad" },
  { type: "REQUEST_ASSISTANCE", label: "Solicitud de ayuda de guardias" },
  { type: "OVER_CAPACITY", label: " Capacidad excedida" },
  { type: "EXCESSIVE_VOLUME", label: "Volumen excedido" },
  { type: "SUSPICIOUS_EMPLOYEE_BEHAVIOR", label: "Actitud" },
];
