import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  password: z.string(),
});

export default function RegisterForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmitPlayer = async (values: z.infer<typeof formSchema>) => {
    const username = values.username;
    const password = values.password;
    // Navvigate to form page
    navigate("/register-player", { state: { username, password } });
  };

  const onSubmitOrganizer = async (values: z.infer<typeof formSchema>) => {
    const username = values.username;
    const password = values.password;
    // Navvigate to form page
    navigate("/register-organizer", { state: { username, password } });
  };

  return (
    <Form {...form}>
      <form className="w-1/5 space-y-6 mx-auto">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                {/* Your password must be .. */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between space-x-4 mx-auto">
          <Button type="button" onClick={form.handleSubmit(onSubmitPlayer)}>
            Register as Player
          </Button>
          <Button type="button" onClick={form.handleSubmit(onSubmitOrganizer)}>
            Register as Organizer
          </Button>
        </div>
      </form>
    </Form>
  );
}
