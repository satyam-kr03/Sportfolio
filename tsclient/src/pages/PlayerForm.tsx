import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const days = [
  {
    id: "monday",
    label: "Monday",
  },
  {
    id: "tuesday",
    label: "Tuesday",
  },
  {
    id: "wednesday",
    label: "Wednesday",
  },
  {
    id: "thursday",
    label: "Thursday",
  },
  {
    id: "friday",
    label: "Friday",
  },
  {
    id: "saturday",
    label: "Saturday",
  },
  {
    id: "sunday",
    label: "Sunday",
  },
] as const;

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  psport: z.string({
    required_error: "Please select at least one sport.",
  }),
  ssport: z.string(),
  plevel: z.string(),
  slevel: z.string(),
  height: z.string(),
  weight: z.string(),
  days: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one day.",
  }),
});

export default function PlayerForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, password } = location.state || {};

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      days: ["saturday", "sunday"],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        "/register-player",
        {
          username: username,
          password: password,
          fullname: values.fullname,
          dob: values.dob,
          phone: values.phone,
          psport: values.psport,
          plevel: values.plevel,
          ssport: values.ssport,
          slevel: values.slevel,
          height: values.height,
          weight: values.weight,
          days: values.days,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Register successful:", response.data);
      // Handle successful login (e.g., save token, redirect)
      // redirect to login page
      navigate("/");
    } catch (e) {
      console.error("Register failed:", e);
    }
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-1/5 space-y-6 mx-auto"
      >
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
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
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal mx-auto",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="+91-" {...field} />
              </FormControl>
              <FormDescription>
                We will only use it to contact you if needed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="psport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Sport</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a sport" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="athletics">Athletics</SelectItem>
                  <SelectItem value="cricket">Cricket</SelectItem>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="lawn-tennis">Lawn Tennis</SelectItem>
                  <SelectItem value="table-tennis">Table Tennis</SelectItem>
                  <SelectItem value="badminton">Badminton</SelectItem>
                  <SelectItem value="hockey">Hockey</SelectItem>
                  <SelectItem value="swimming">Swimming</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="plevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select one option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ssport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary Sport</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a sport" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="athletics">Athletics</SelectItem>
                  <SelectItem value="cricket">Cricket</SelectItem>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="lawn-tennis">Lawn Tennis</SelectItem>
                  <SelectItem value="table-tennis">Table Tennis</SelectItem>
                  <SelectItem value="badminton">Badminton</SelectItem>
                  <SelectItem value="hockey">Hockey</SelectItem>
                  <SelectItem value="swimming">Swimming</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select one option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Height (in cm)</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Weight (in kg)</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="days"
          render={() => (
            <FormItem>
              <div className="mx-auto text-center">
                <FormLabel className="text-base">Availability</FormLabel>
                <FormDescription>
                  Select the days when you are available.
                </FormDescription>
              </div>
              <div className="flex justify-center">
                {" "}
                <div className="space-y-4">
                  {" "}
                  {days.map((day) => (
                    <FormField
                      key={day.id}
                      control={form.control}
                      name="days"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={day.id}
                            className="flex flex-row items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(day.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, day.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== day.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {day.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
