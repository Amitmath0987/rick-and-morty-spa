import React from "react";
import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Character } from "../types/Character";

const fetchCharacterById = async (id: string) => {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  return response.data;
};

const containerStyle: React.CSSProperties = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '40px',
  backgroundColor: '#fff',
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const imageStyle: React.CSSProperties = {
  width: '250px',
  height: '250px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '32px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  border: '4px solid #fff',
};

const detailStyle: React.CSSProperties = {
  marginBottom: '16px',
  fontSize: '20px',
  color: '#333',
  display: 'flex',
  alignItems: 'center',
  padding: '12px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  width: '100%',
};

const labelStyle: React.CSSProperties = {
  fontWeight: '600',
  color: '#666',
  marginRight: '12px',
  minWidth: '100px',
};

const CharacterDetail: React.FC = () => {
  const { id } = useParams({ from: "/character/$id" });
  const {
    data: character,
    isLoading,
    isError,
  } = useQuery<Character>({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
  });

  if (isLoading) return <div style={{ textAlign: 'center', padding: '40px', color: '#666', fontSize: '24px' }}>Loading character...</div>;
  if (isError || !character) return <div style={{ textAlign: 'center', padding: '40px', color: '#e53e3e', fontSize: '24px' }}>Error loading character</div>;

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center' }}>
        <img src={character.image} alt={character.name} style={imageStyle} />
        <h2 style={{ fontSize: '36px', marginBottom: '32px', color: '#222', fontWeight: '600' }}>{character.name}</h2>
      </div>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <div style={detailStyle}>
          <span style={labelStyle}>Status:</span>
          <span>{character.status}</span>
        </div>
        <div style={detailStyle}>
          <span style={labelStyle}>Species:</span>
          <span>{character.species}</span>
        </div>
        <div style={detailStyle}>
          <span style={labelStyle}>Gender:</span>
          <span>{character.gender}</span>
        </div>
        <div style={detailStyle}>
          <span style={labelStyle}>Origin:</span>
          <span>{character.origin.name}</span>
        </div>
        <div style={detailStyle}>
          <span style={labelStyle}>Location:</span>
          <span>{character.location.name}</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
