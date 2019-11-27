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
} from './styles';

export default function CarSearch() {
  const [cars, setCars] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [categoryOption, setCategoryOption] = useState([]);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [model, setModel] = useState('');

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
    }

    loadSelectOptions();
  }, []);

  async function loadCars() {
    const response = await api.get('obterAnuncios', {
      params: {
        categoria: category.value,
        marca: brand.value,
        modelo: model,
        // anoInicio: '2015',
        // anoFim: '2019',
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

  async function handleSubmit(e) {
    e.preventDefault();
    console.tron.log(category.value);
    console.tron.log(brand.value);
    console.tron.log(model);
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
