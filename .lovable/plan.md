

## Mock Login — Validação Frontend

Adicionar validação mock no `Login.tsx`: apenas `admin@admin.com` / `admin` permite acesso. Qualquer outra combinação exibe o erro "Acesso negado".

### Alteração única: `src/pages/Login.tsx`

- Capturar valores de email e senha com `useState`
- No `handleSubmit`, verificar se email === `admin@admin.com` e senha === `admin`
- Se correto: `navigate("/dashboard")`
- Se incorreto: `setError(true)` (já existe o bloco de erro no JSX)

Nenhum backend, nenhuma dependência nova.

