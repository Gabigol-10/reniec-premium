export const initialUsers = [
  {
    id: "1",
    dni: "47281928",
    fullName: "Alessandro Rossi Torres",
    email: "alessandro.rossi@reniec.pe",
    phone: "987654321",
    status: "active",
    registrationDate: "2024-01-15",
    address: "Av. Larco 456, Miraflores",
    department: "Lima",
    gender: "M",
    birthDate: "1992-05-24",
    activityLog: [
      { id: "a1", date: "2024-01-15 09:30", action: "Registro Inicial", details: "Registro del ciudadano en el sistema nacional" },
      { id: "a2", date: "2024-08-20 14:15", action: "Actualización de Datos", details: "Actualización de domicilio electoral" },
      { id: "a3", date: "2025-02-10 11:05", action: "Emisión de Duplicado", details: "Trámite de duplicado de DNI físico completado" }
    ]
  },
  {
    id: "2",
    dni: "09871234",
    fullName: "Valentina Sofía Gómez Prado",
    email: "valentina.gomez@gmail.com",
    phone: "912345678",
    status: "active",
    registrationDate: "2023-11-02",
    address: "Calle Mercaderes 112, Cercado",
    department: "Arequipa",
    gender: "F",
    birthDate: "1995-10-12",
    activityLog: [
      { id: "b1", date: "2023-11-02 10:00", action: "Registro Inicial", details: "Registro del ciudadano en el sistema nacional" },
      { id: "b2", date: "2025-01-14 15:45", action: "Rectificación de Estado Civil", details: "Cambio de estado civil a Casado" }
    ]
  },
  {
    id: "3",
    dni: "70293847",
    fullName: "Juan Carlos Mendoza Quispe",
    email: "juan.mendoza@outlook.com",
    phone: "998877665",
    status: "inactive",
    registrationDate: "2024-03-22",
    address: "Jr. De la Unión 824, Centro Histórico",
    department: "Lima",
    gender: "M",
    birthDate: "1988-03-05",
    activityLog: [
      { id: "c1", date: "2024-03-22 08:45", action: "Registro Inicial", details: "Registro del ciudadano en el sistema nacional" },
      { id: "c2", date: "2026-04-12 16:30", action: "Suspensión Temporal", details: "Inactivación de DNI por reporte administrativo" }
    ]
  },
  {
    id: "4",
    dni: "41982736",
    fullName: "María Alejandra Flores Ramos",
    email: "maria.flores@yahoo.com",
    phone: "955443322",
    status: "active",
    registrationDate: "2024-05-18",
    address: "Urb. La Angostura D-15",
    department: "Ica",
    gender: "F",
    birthDate: "1983-08-30",
    activityLog: [
      { id: "d1", date: "2024-05-18 11:20", action: "Registro Inicial", details: "Registro del ciudadano en el sistema nacional" }
    ]
  },
  {
    id: "5",
    dni: "80273645",
    fullName: "Mateo Sebastián Condori Mamani",
    email: "mateo.condori@reniec.pe",
    phone: "944332211",
    status: "active",
    registrationDate: "2023-09-10",
    address: "Av. El Sol 320, Wanchaq",
    department: "Cusco",
    gender: "M",
    birthDate: "1998-12-04",
    activityLog: [
      { id: "e1", date: "2023-09-10 14:00", action: "Registro Inicial", details: "Registro del ciudadano en el sistema nacional" },
      { id: "e2", date: "2024-12-05 09:15", action: "Actualización de Firma", details: "Renovación de firma digital en DNI electrónico" }
    ]
  },
  {
    id: "6",
    dni: "45362718",
    fullName: "Camila Belén Vega Ortiz",
    email: "camila.vega@outlook.com",
    phone: "933221100",
    status: "inactive",
    registrationDate: "2022-07-25",
    address: "Calle Real 745, El Tambo",
    department: "Junín",
    gender: "F",
    birthDate: "1990-04-18",
    activityLog: [
      { id: "f1", date: "2022-07-25 10:30", action: "Registro Inicial", details: "Registro del ciudadano en el sistema nacional" },
      { id: "f2", date: "2025-05-10 18:00", action: "Caducidad de DNI", details: "DNI vencido sin solicitud de renovación" }
    ]
  },
  {
    id: "7",
    dni: "76543210",
    fullName: "Diego Alonso Guerrero Ruiz",
    email: "diego.guerrero@gmail.com",
    phone: "922110099",
    status: "active",
    registrationDate: "2024-09-01",
    address: "Av. Larco 980",
    department: "La Libertad",
    gender: "M",
    birthDate: "1996-07-07",
    activityLog: [
      { id: "g1", date: "2024-09-01 09:00", action: "Registro Inicial", details: "Registro del ciudadano en el sistema nacional" }
    ]
  },
  {
    id: "8",
    dni: "08765432",
    fullName: "Lucía Fernanda Chávez Paredes",
    email: "lucia.chavez@gmail.com",
    phone: "911009988",
    status: "active",
    registrationDate: "2025-01-20",
    address: "Jr. Huánuco 432",
    department: "Huánuco",
    gender: "F",
    birthDate: "2001-02-14",
    activityLog: [
      { id: "h1", date: "2025-01-20 16:40", action: "Registro Inicial", details: "Registro del ciudadano en el sistema nacional" }
    ]
  }
];

export const initialLogs = [
  { id: "log-1", user: "Alessandro Rossi Torres", action: "Emisión de Duplicado", date: "2025-02-10 11:05", type: "update" },
  { id: "log-2", user: "Valentina Sofía Gómez Prado", action: "Rectificación de Estado Civil", date: "2025-01-14 15:45", type: "update" },
  { id: "log-3", user: "Mateo Sebastián Condori Mamani", action: "Actualización de Firma", date: "2024-12-05 09:15", type: "update" },
  { id: "log-4", user: "Juan Carlos Mendoza Quispe", action: "Suspensión Temporal", date: "2026-04-12 16:30", type: "delete" },
  { id: "log-5", user: "Lucía Fernanda Chávez Paredes", action: "Registro Inicial", date: "2025-01-20 16:40", type: "create" }
];
