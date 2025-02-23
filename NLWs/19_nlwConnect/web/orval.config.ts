import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: 'http://localhost:8080/docs/json',
    output: {
      target: './src/http/api.ts',
      client: 'fetch',
      httpClient: 'fetch',
      clean: true, // Apagar o arquivo anterior (evitando conflito)
      baseUrl: 'http://localhost:8080',

      override: {
        fetch: {
          includeHttpResponseReturnType: false, // Nao pegar o Status Code e sim os dados
        },
      },
    },
  },
})