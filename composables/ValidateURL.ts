import { toast } from "~/components/ui/toast";

export default function validateURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    toast({
      title: 'Error',
      description: "Please enter a valid URL",
      variant: "destructive",
    });

return false;
  }
}
