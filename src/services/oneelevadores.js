import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3232',
});

const getSession = async () => {
  try {
    const response = await api.post('/session', {
      login: 'oneelevadores@oneelevadores.com',
      password: '123456',
    });

    localStorage.setItem('loginToken', response.data.token);
  } catch (err) {
    console.log('ERRO: ', err);
  }
};

getSession();
