import { defineConfig } from 'vitest/config'


//o jsdom vai criar um navegador virtual, como se fosse uma pagina fake, vai simular o window, no ambiente node, na linha de comando.
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
})