const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include', // send/receive httpOnly cookies (refresh token)
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  const data = await res.json()

  if (!res.ok) {
    const err = new Error(data.message || 'Something went wrong')
    err.status = res.status
    err.data = data
    throw err
  }

  return data
}

export const api = {
  post: (path, body, options) => request(path, { method: 'POST', body, ...options }),
  get:  (path, options)       => request(path, { method: 'GET', ...options }),
}
