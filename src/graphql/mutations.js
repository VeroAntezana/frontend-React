import { gql } from '@apollo/client/core';

// Crear un ticket (por pasajero)
export const CREATE_TICKET = gql`
  mutation CreateTicket(
    $origin: String!,
    $destination: String!,
    $passengerName: String!,
    $passengerApellido: String!,
    $seatNumber: Int!,
    $date: String!,
    $price: Float!
  ) {
    createTicket(
      origin: $origin,
      destination: $destination,
      passengerName: $passengerName,
      passengerApellido: $passengerApellido,
      seatNumber: $seatNumber,
      date: $date,
      price: $price
    ) {
      id
      passengerName
      origin
      destination
      seatNumber
      price
      qrCode
      hash
    }
  }
`;

// Registrar pago total
export const CREATE_PAYMENT = gql`
  mutation CreatePayment(
    $passengerName: String!,
    $amount: Float!,
    $method: String!
  ) {
    createPayment(
      passengerName: $passengerName,
      amount: $amount,
      method: $method
    ) {
      id
      status
      confirmationCode
    }
  }
`;

export const CREAR_USUARIO = gql`
  mutation crearUsuario($input: UsuarioInput!) 
  { crearUsuario(input: $input) 
  { id nombre email rol_id }
}`;

export const CREAR_VEHICULO = gql`
  mutation crearVehiculo($input: VehiculoInput!) {
    crearVehiculo(input: $input) {
      id
      marca
      modelo
      anio
      color
      placa
      tipo
      estado
      usuario_id
      usuario_nombre
    }
  }
`;