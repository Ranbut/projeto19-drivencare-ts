export type ApplicationError = {
    name: string;
    message: string;
};
  
export type Patient = {
    name: string;
    cpf: string;
    email: string;
    password: string;
  };
  
export type Medic = {
    name: string;
    cpf: string;
    address: string;
    specialization: string;
    email: string;
    password: string;
  };

export type RequestError = {
    status: number;
    data: object | null;
    statusText: string;
    name: string;
    message: string;
};
  