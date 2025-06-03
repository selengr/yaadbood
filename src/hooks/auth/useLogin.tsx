import { loginWithEmail } from "@/networks/auth";
import useMutateApi from "../core/useAppMutation";
import { UseMutationResult } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AUTH_MESSAGES } from "@/constants";

export function useLoginMutation(
  onSuccess?: (res: any) => void
): UseMutationResult<any, unknown, string> {
  return useMutateApi({
    mutationFn: (email: string) => loginWithEmail({ email }),
    onSuccess: (res) => {
      console.log('Login success:', res);
      toast.success(`${AUTH_MESSAGES.OTP.SENT}`);
      onSuccess?.(res);
    },
  });
}