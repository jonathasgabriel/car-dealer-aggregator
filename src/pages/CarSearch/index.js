import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import { MdSearch } from 'react-icons/md';

import api from '~/services/api';

import {
  Container,
  CarItem,
  SearchForm,
  Filters,
  Filter,
  FilterTitle,
  Input,
  Title,
  Content,
  Price,
  Description,
} from './styles';

export default function CarSearch() {
  const [cars, setCars] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [categoryOption, setCategoryOption] = useState([]);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [model, setModel] = useState('');
  const [yearOptions, setYearOptions] = useState([]);
  const [startYear, setStartYear] = useState([]);
  const [endYear, setEndYear] = useState([]);

  useEffect(() => {
    async function loadSelectOptions() {
      const [loadedBrands, loadedCategories] = await Promise.all([
        api.get('obterMarcas'),
        api.get('obterCategorias'),
      ]);

      setBrandOptions(
        loadedBrands.data.map(brd => {
          return {
            value: brd,
            label: brd,
          };
        })
      );

      setCategoryOption(
        loadedCategories.data.map(cat => {
          return {
            value: cat,
            label: cat,
          };
        })
      );

      const year = 1980;
      const years = Array.from(new Array(60), (val, index) => index + year);

      setYearOptions(
        years.map(y => {
          return {
            value: y,
            label: y,
          };
        })
      );
    }

    loadSelectOptions();
  }, []);

  async function loadCars() {
    const response = await api.get('obterAnuncios', {
      params: {
        categoria: 'CARROS', // category.value,
        marca: 'FIAT', // brand.value,
        modelo: 'uno', // model,
        anoInicio: '2012', // startYear.value,
        anoFim: '2016', // endYear.value,
        // valorInicio: '',
        // valorFim: '',
        // cidade: '',
        // estado: 'RS',
        limiteBusca: 3,
        // ordemPreco: '',
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
  }

  useEffect(() => {
    async function test() {
      const response = await api.get('obterAnuncios', {
        params: {
          categoria: 'CARROS', // category.value,
          marca: 'FIAT', // brand.value,
          modelo: 'uno', // model,
          anoInicio: '2012', // startYear.value,
          anoFim: '2016', // endYear.value,
          // valorInicio: '',
          // valorFim: '',
          // cidade: '',
          // estado: 'RS',
          limiteBusca: 90,
          // ordemPreco: '',
        },
      });

      setCars(
        response.data.map(car => {
          return {
            ...car,
            shortDescription:
              car.dadosGerais.length > 160
                ? `${car.dadosGerais.slice(0, 157)}...`
                : car.dadosGerais,
          };
        })
      );
    }

    test();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    loadCars();
  }

  return (
    <Container>
      <SearchForm onSubmit={handleSubmit}>
        <Filters>
          <Filter>
            <FilterTitle>Marca</FilterTitle>
            <Select
              isSearchable
              isClearable
              options={brandOptions}
              onChange={e => setBrand(e)}
            />
          </Filter>
          <Filter>
            <FilterTitle>Categoria</FilterTitle>
            <Select
              isSearchable
              isClearable
              options={categoryOption}
              onChange={e => setCategory(e)}
            />
          </Filter>
          <Filter>
            <FilterTitle>Modelo</FilterTitle>
            <Input onChange={e => setModel(e.target.value)} />
          </Filter>
          <Filter>
            <FilterTitle>Ano Inicio</FilterTitle>
            <Select
              isSearchable
              isClearable
              options={yearOptions}
              onChange={e => setStartYear(e)}
            />
          </Filter>
          <Filter>
            <FilterTitle>Ano Fim</FilterTitle>
            <Select
              isSearchable
              isClearable
              options={yearOptions}
              onChange={e => setEndYear(e)}
            />
          </Filter>
        </Filters>

        <button type="submit">
          <MdSearch size={20} />
          Buskar
        </button>
      </SearchForm>
      <ul>
        {cars.length === 0
          ? 'Não foram encontrados resultados'
          : cars.map(car => (
              <CarItem key={String(car.urlOrigemBusca)}>
                <Title>
                  <strong> {car.tituloAnuncio}</strong>
                </Title>
                <Content>
                  <div>
                    <img src={car.imagem} alt="car" />
                    <span>{car.endereco}</span>
                  </div>
                  <Description>{car.shortDescription}</Description>
                </Content>
                <Price>
                  <strong>R$ {car.valorFormatado}</strong>
                  <a href={car.urlOrigemBusca}>Ir para a página</a>
                </Price>
              </CarItem>
            ))}
      </ul>
    </Container>
  );
}
