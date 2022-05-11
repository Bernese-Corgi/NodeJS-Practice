## 발생 이슈

### 1. Type 'Promise<AxiosResponse<any, any>>' has no call signatures.

#### 문제 코드

```tsx
import React from 'react';
import * as apiDocsApi from '../utils/api/apiDocs';

const ApiDocs = () => {
  const handleClickGetApi = async () => {
    const response = await apiDocsApi.readAllApiDocs();
  };

  return (
    <>
      <button onClick={handleClickGetApi}>get</button>
    </>
  );
};

export default ApiDocs;
```

#### 1차 해결

해결 실패 > 같은 에러 발생

<img width="1210" alt="image" src="https://user-images.githubusercontent.com/72931773/167432852-82886ddf-45d9-4302-8cf5-6ae25315e9e4.png">

```tsx
import React from 'react';
import * as apiDocsApi from '../utils/api/apiDocs';

const ApiDocs = () => {
  const handleClickGetApi = async () => {
    try {
      const response = await apiDocsApi.readAllApiDocs();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <button onClick={handleClickGetApi}>get</button>
    </>
  );
};

export default ApiDocs;
```
