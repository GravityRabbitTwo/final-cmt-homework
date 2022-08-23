// Path : app/javascript/components/GreetUser.js
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components'
import { NPITable } from "../components/npi-table";
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../components/button'
import { useQuery } from "react-query";
import { fetchNPI } from '../../helpers/axios-requests';
import { add, sort, clear } from "../redux-slices/npi-slice";
import { ErrorDisplayHtml } from "../components/error_display_html";

// styles
const MainPage = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: lightgray;
  padding: 40px 0px;
  position: relative;
  display: grid;
  grid-template-rows: 90px 1fr 128px;
  row-gap: 10px;
`
const HeaderContainer = styled.div`
  grid-row: 1;
  width: 1024px;
  margin-left: calc(50% - 512px);
  background-color: white;
  padding: 20px 10px;
  box-shadow: 5px 4px 10px 0px rgba(23,160,255,0.24);
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 290px;
`

const BodyContainer = styled.div`
  grid-row: 2;
  width: 1024px;
  margin-left: calc(50% - 512px);
  background-color: white;
  padding: 20px 10px;
  box-shadow: 5px 4px 10px 0px rgba(23,160,255,0.24);
  border-radius: 10px;
  margin-top: 20px;
  overflow-x: auto;
  overflow-y: hidden;
`

const HeaderLabel = styled.span`
  font-size: 20px;
  color: rgb(62, 200, 250);
  text-transform: uppercase;
  grid-column: 1;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 45px;
  font-weight: bold;
`

const HeaderButtonPanel = styled.div`
  grid-column: 2;
  display: flex;
  column-gap: 20px;
`

const NPINumberContainer = styled.div`
  height: 100%;
  width:  110px;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`

const NPINumberInput = styled.input`
  outline: none;
  border: 1px solid rgb(62, 200, 250);
  border-radius: 5px;
  width: 100%;
  height: 28px;
  font-size: 16px;
`

const NPINumberLabel = styled.p`
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: darkgray;
  font-family: Arial, Helvetica, sans-serif;
`

const ClearButtonContainer = styled.div`
  grid-row: 3;
  margin-top: 16px;
  width: 1024px;
  margin-left: calc(50% - 512px);
  display: grid;
  grid-template-columns: 1fr 150px;
`

function NpiPage() {
  const dispatch = useDispatch();
  const [npiTextValue, setNpiTextValue] = useState('');
  const [npiNumber, setNpiNumber] = useState('');
  const [npiError, setNpiError] = useState(null);
  const [htmlErrorString, setHtmlErrorString] = useState(null);
  const npi = useSelector((state) => state.value);
  return (
    <MainPage onClick={() => setHtmlErrorString(null)}>
      {htmlErrorString &&
        <ErrorDisplayHtml htmlString={htmlErrorString} />
      }
      <HeaderContainer>
        <HeaderLabel>Record List</HeaderLabel>
        <HeaderButtonPanel>
          <NPINumberContainer>
            <NPINumberInput onChange={event => setNpiTextValue(event.target.value)} />
            <NPINumberLabel>NPI Lookup</NPINumberLabel>
          </NPINumberContainer>
          <Button width="200px" primary={true} onClick={async () => {
            const npiRecords = await fetchNPI(npiTextValue);
            if (npiRecords.Errors) {
              setNpiError(npiRecords.Errors[0].description);
              alert(npiRecords.Errors[0].description);
            }
            else if (!npiRecords.results || npiRecords.results.length === 0) {
              setNpiError('No NPI Results found for NPI Number');
              alert('No NPI Results found for NPI Number');
            }
            else {
              npiRecords.results.forEach(result => {
                dispatch(add({ number: result.number, result }));
                dispatch(sort());
              })
            }
          }} label="Find" />
        </HeaderButtonPanel>
      </HeaderContainer>
      <BodyContainer>
        <NPITable npiRecords={npi} />
      </BodyContainer>
      <ClearButtonContainer>
        <div />
        <Button width="150px" primary={true} label="Clear" onClick={() => {
          dispatch(clear())
        }
        } />
      </ClearButtonContainer>
    </MainPage>
  );
}

export default NpiPage;