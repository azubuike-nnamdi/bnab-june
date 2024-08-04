import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormControl, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  fullName: z.string().min(5, {
    message: "Fullname must be at least 5 characters"
  }),
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits"
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters"
  }),
  message: z.string().min(2, {
    message: "Message must be at least 2 characters"
  }),
});

export default function ContactForm() {


  return (
    <main>
      <h1 className="sm:text-3xl text-xl font-medium text-gray-800">Leave us your info</h1>

    </main>
  );
}
