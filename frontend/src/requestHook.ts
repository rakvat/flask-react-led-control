import { Dispatch, SetStateAction, useCallback } from 'react';

const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
};

interface RequestData {
    [Key: string]: string | number;
}

export function useRequest(path: string, requestBody: RequestData, setStatus: Dispatch<SetStateAction<string>>) {

    const requestCallback = useCallback(() => {
      fetch(path, {...requestOptions, body: JSON.stringify(requestBody)})
          .then((response) => {
              if (response.status > 400) {
                  setStatus('Failed to connect :(');
              }
              return response.json()
          })
          .then(data => setStatus(data.message));
    }, [path, requestBody, setStatus]);

    return requestCallback;
}
