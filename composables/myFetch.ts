export const myFetch: typeof useFetch = (request, opts?) => {
  return useFetch(request, {baseURL: '/api', ...opts})
}

export const $myFetch = $fetch.create({
  // baseURL: useRuntimeConfig().public.baseURL,
  baseURL: '/api',
  credentials: 'include',
})

export const getSingle = {
  'Accept': 'application/vnd.pgrst.object+json',
}

export const returnSingle = {
  'Accept': 'application/vnd.pgrst.object+json',
  'Prefer': 'return=representation',
}
