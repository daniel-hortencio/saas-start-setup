import { toast } from "@repo/ui/components";

export const toastMessageError = () => {
  toast({
    variant: "destructive",
    title: "Erro de autenticação",
    description: "Sei lá o que foi que aconteceu aqui...",
  });
};
