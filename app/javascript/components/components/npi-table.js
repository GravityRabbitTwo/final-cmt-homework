import React, { useState, useEffect } from "react";
import styled from "styled-components";

const NPITableContainer = styled.div`
  display: grid;
  grid-template-rows: 40px 1fr;
  border: 1px solid rgb(62, 200, 250);
  overflow: hidden;
  height: 100%;
`

const NPIRecord = styled.div`
  display: grid;
  grid-template-columns: 120px 75px 75px 0.3fr 0.3fr 0.4fr;
  border-bottom: 1px solid rgb(62, 200, 250);
  background-color:  ${({ isHeader }) => isHeader ? 'rgb(62, 200, 250)' : 'white'};
`

const NPITableScrollable = styled.div`
  width: 100%;
  max-height: 600px;
  overflow-y: auto;
`

const NPITableInnerContainer = styled.div`
  width: 100%;
  height: auto;
`

const NPIField = styled.p`
  margin: 0px;
  padding: ${({ isHeader }) => isHeader ? '0 10px' : '10px'};
  grid-column: ${({ column }) => column};
  border-right: 1px solid rgb(62, 200, 250);
  font-family: Arial, Helvetica, sans-serif;
  font-weight: ${({ isHeader }) => isHeader ? 'bold' : 'normal'};
  border-right: 1px solid rgb(62, 200, 250);
  color: ${({ isHeader }) => isHeader ? 'white' : '#202020'};
  text-align: ${({ isHeader }) => isHeader ? 'center' : 'left'};
  line-height: ${({ isHeader }) => isHeader ? '40px' : '20px'};
`

const NPIParentField = styled.div`
  margin: 0px;
  padding: 10px 10px;
  grid-column: ${({ column }) => column};
  border-right: 1px solid rgb(62, 200, 250);
  font-family: Arial, Helvetica, sans-serif;
  line-height: 20px;
  color: #202020;
  font-weight: ${({ isHeader }) => isHeader ? 'bold' : 'normal'};
  border-right: 1px solid rgb(62, 200, 250);
`

const NPITaxonomyContainer = styled.div`
  margin-bottom: 8px;
  padding: 0px 10px;
  border-bottom: 1px solid rgb(62, 200, 250);
  :last-child {
    border-bottom: none;
  }
`
const NPITaxonomyEntry = styled.p`
  padding: 0px;
  margin: 0px;
`

export function NPITable({ npiRecords }) {
  return (
    <NPITableContainer>
      <NPIRecord isHeader={true} key="header">
        <NPIField isHeader={true}>Number</NPIField>
        <NPIField isHeader={true}>Type</NPIField>
        <NPIField isHeader={true}>Gender</NPIField>
        <NPIField isHeader={true}>Name</NPIField>
        <NPIField isHeader={true}>Address</NPIField>
        <NPIField isHeader={true}>Taxonomies</NPIField>
      </NPIRecord>
        
      <NPITableScrollable>
        <NPITableInnerContainer>
          {npiRecords && npiRecords.map(element => {
            const result = element.result;
            const address = result.addresses && result.addresses.length > 0 && result.addresses[0];
            let taxonomies = [];
            if (result.taxonomies)
              result.taxonomies.forEach(tax => {
                taxonomies.push(<NPITaxonomyContainer key={tax.code}>
                  <NPITaxonomyEntry>{`Code: ${tax.code}`}</NPITaxonomyEntry>
                  <NPITaxonomyEntry>{`Primary: ${tax.primary ? 'Yes' : 'No'}`}</NPITaxonomyEntry>
                  <NPITaxonomyEntry>{`Description: ${tax.desc}`}</NPITaxonomyEntry>
                  <NPITaxonomyEntry>{`State: ${tax.state ? tax.state : 'N/A' }`}</NPITaxonomyEntry>
                  <NPITaxonomyEntry>{`License: ${tax.license ? tax.license : 'N/A'}`}</NPITaxonomyEntry>
                </NPITaxonomyContainer>);
              })
            return <NPIRecord isHeader={false} key={element.number}>
              <NPIField>{element.number}</NPIField>
              <NPIField>{result.enumeration_type}</NPIField>
              <NPIField>{result.basic.gender === 'F' ? 'Female' : result.basic.gender === 'M' ? 'Male' : 'NA'}</NPIField>
              <NPIField>{`${result.other_names && result.other_names.length
                ? result.other_names[0].last_name + ', ' + result.other_names[0].first_name
                : result.basic &&
                result.basic.last_name + ', ' + result.basic.first_name}`}</NPIField>
              <NPIField>{`${address.address_1}\n${address.city}, ${address.state} ${address.postal_code}`}</NPIField>
              <NPIParentField>{taxonomies}</NPIParentField>
            </NPIRecord>
          })}
        </NPITableInnerContainer>
      </NPITableScrollable>
    </NPITableContainer>
  )
}