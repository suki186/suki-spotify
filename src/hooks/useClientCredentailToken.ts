import { useQuery } from "@tanstack/react-query";
import { getClientCredentailToken } from "../apis/authApi";

// Access Token 발급
const useClientCredentailToken = (): string | undefined => {
  const { data } = useQuery({
    queryKey: ["client-credentail-token"],
    queryFn: getClientCredentailToken,
  });

  // access_token만 가져오기
  const clientCredentialToken = data?.access_token;
  return clientCredentialToken;
};

export default useClientCredentailToken;
