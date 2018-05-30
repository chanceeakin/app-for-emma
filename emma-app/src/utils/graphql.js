// @flow
async function callGraphQL(query: string): Promise<Object> {
  try {
    const response = await fetch('http://127.0.0.1:8080/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: query })
    })
    const json = await response.json()
    return json.data
  } catch (e) {
    throw e
  }
}

export default callGraphQL
