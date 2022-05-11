import React from 'react';
import * as apiDocsApi from '../utils/api/apiDocs';

interface ApiDocsProps {
  //
}

const ApiDocs = ({}: ApiDocsProps) => {
  //
  const handleClickGetApi = async () => {
    const response = await apiDocsApi.readAllApiDocs();
    // const promise = new Promise();

    try {
    } catch (error) {
      // throw new Error(error);
    }
  };

  return (
    <>
      <p></p>
      <button onClick={handleClickGetApi}>get</button>
    </>
  );
};

export default ApiDocs;
