import React, { useState, useEffect } from 'react';

import api from '~/services/api';

import { Container, CarItem } from './styles';

export default function CarSearch() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCars() {
      setLoading(true);
      const response = await api.get('anuncios/obterAnuncios', {
        params: {
          categoria: 'CARROS',
          marca: 'FIAT',
          modelo: 'uno',
          anoInicio: '2015',
          anoFim: '2019',
          valorInicio: '',
          valorFim: '',
          cidade: '',
          estado: 'RS',
          limiteBusca: 25,
          ordemPreco: '',
        },
      });
      setCars(
        response.data.map(car => {
          return {
            ...car,
            shortDescription:
              car.dadosGerais.length > 250
                ? `${car.dadosGerais.slice(0, 247)}...`
                : car.dadosGerais,
          };
        })
      );
      setLoading(false);
    }

    loadCars();
  }, []);

  return (
    <Container>
      <header>
        <strong>Filters</strong>
      </header>
      <ul>
        {loading
          ? 'carregando'
          : cars.length === 0
          ? 'Não foram encontrados resultados'
          : cars.map(car => (
              <CarItem key={String(car.urlOrigemBusca)}>
                <div>
                  <strong> {car.tituloAnuncio}</strong>
                </div>
                <div>
                  <img src={car.imagem} alt="car" />
                  <span>{car.endereco}</span>
                  <span>{car.shortDescription}</span>
                </div>
                <div>
                  <strong>R$ {car.valorFormatado}</strong>
                  <a href={car.urlOrigemBusca}>Ir para a página</a>
                </div>
              </CarItem>
            ))}
      </ul>
    </Container>
  );
}
