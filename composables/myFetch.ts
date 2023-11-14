export const myFetch: typeof useFetch = (request, opts?) => {
  return useFetch(request, {
    baseURL: '/api',
    onRequest({request, options}) {
      // @ts-ignore
      if (options.headers['x-forwarded-proto']) {
        // @ts-ignore
        options.headers['x-forwarded-proto'] = 'https'
      }
    },
    ...opts,
  })
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
