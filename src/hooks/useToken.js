import useSWRMutation from "swr/mutation";
import useFetch from "./useFetch";

const useToken = (email, password) => {
  const fetch = useFetch();
  const { trigger, isMutating } = useSWRMutation(['/user/getToken', email, password], ([url, email, password]) => fetch({ url, method: 'POST', data: { email, password } }))

  return { triggerToken: trigger, loading: isMutating }
}

export default useToken;