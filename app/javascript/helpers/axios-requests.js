import React from 'react';
import axios from 'axios';

const SERVER_PATH = 'http://localhost:3000/'
export async function fetchNPI(npiKey) {
  return axios.get(`${SERVER_PATH}npis${npiKey ? ('/' + npiKey) : ''}`).
    then(results => {
      return results.data;
    }).catch(error => {
      return { error: error.code, message: error.message };
    })
}