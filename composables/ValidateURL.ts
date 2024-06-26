import {   useToast } from "~/components/ui/toast";
const {toast} = useToast();
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
