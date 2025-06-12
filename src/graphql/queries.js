import { gql } from '@apollo/client/core';

// Buscar tickets disponibles
export const SEARCH_TICKETS = gql`
  query ($origin: String!, $destination: String!, $date: String!) {
    searchTickets(origin: $origin, destination: $destination, date: $date) {
      id
      origin
      destination
      departureTime
      arrivalTime
      price
      company
    }
  }
`;
export const OBTENER_USUARIOS = gql`
  query obtenerUsuarios{
    obtenerUsuarios {
      id
      nombre
      email
      rol_id
    }
  }
`;

export const OBTENER_VEHICULOS = gql`
  query obtenerVehiculos {
    obtenerVehiculos {
      anio
      color
      estado
      marca
      id
      modelo
      placa
      tipo
      usuario_id
      usuario_nombre
    }
  }
  `;

// NLP: Parsear lenguaje natural
export const PARSE_NLP = gql`
  query ($text: String!) {
    parseNaturalText(text: $text) {
      origin
      destination
      date
      passengers
    }
  }
`;

// Obtener todos los tickets (admin)
export const GET_TICKETS = gql`
  query {
    getTickets {
      id
      origin
      destination
      passengerName
      passengerApellido
      seatNumber
      date
      price
      qrCode
      hash
    }
  }
`;

// Obtener todos los pagos (admin)
export const GET_PAYMENTS = gql`
  query {
    getPayments {
      id
      passengerName
      amount
      method
      status
      confirmationCode
      timestamp
    }
  }
`;
