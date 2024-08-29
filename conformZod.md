# Conform Zod

# Using Zod and Conform with Next.js and useFormState

Zod and Conform are powerful tools for form validation in Next.js applications. Here's how to use them together with the `useFormState` hook:

1. Installation:
   First, install the necessary packages:

   ```bash
   npm install zod @conform-to/zod @conform-to/react
   ```

2. Create a Zod schema:
   Define your form schema using Zod:

   ```typescript
   import { z } from 'zod';

   const loginSchema = z.object({
     email: z.string().email("Invalid email address"),
     password: z.string().min(8, "Password must be at least 8 characters"),
   });
   ```

3. Set up your form component:
   Use Conform and useFormState to handle form submission and validation:

   ```tsx
   import { useForm } from '@conform-to/react';
   import { parse } from '@conform-to/zod';
   import { useFormState } from 'react-dom';

   function LoginForm() {
     const [form, fields] = useForm({
       id: 'login-form',
       onValidate({ formData }) {
         return parse(formData, { schema: loginSchema });
       },
     });

     const [state, formAction] = useFormState(handleSubmit, null);

     async function handleSubmit(prevState: any, formData: FormData) {
       const result = await form.validate(formData);
       if (!result.valid) {
         return { errors: result.error.flatten() };
       }
       // Handle successful form submission
       return { success: true };
     }

     return (
       <form id={form.id} onSubmit={form.onSubmit} action={formAction}>
         <div>
           <label htmlFor={fields.email.id}>Email:</label>
           <input
             type="email"
             id={fields.email.id}
             name={fields.email.name}
             required
           />
           {fields.email.error && <p>{fields.email.error}</p>}
         </div>
         <div>
           <label htmlFor={fields.password.id}>Password:</label>
           <input
             type="password"
             id={fields.password.id}
             name={fields.password.name}
             required
           />
           {fields.password.error && <p>{fields.password.error}</p>}
         </div>
         <button type="submit">Log In</button>
         {state?.success && <p>Login successful!</p>}
       </form>
     );
   }
   ```

This setup combines Zod for schema definition, Conform for form handling, and useFormState for managing form state and submission in a Next.js environment. It provides robust client-side validation while also being compatible with server-side processing.


## Zod 
Zod is a TypeScript-first schema declaration and validation library that works well with Next.js applications. Here's how you can use Zod in your Next.js project:

1. Installation:
   First, install Zod in your Next.js project:

   ```bash
   npm install zod
   ```

2. Creating Schemas:
   Define your schemas using Zod. For example:

   ```typescript
   import { z } from 'zod';

   const UserSchema = z.object({
     name: z.string().min(2).max(50),
     email: z.string().email(),
     age: z.number().min(18).optional(),
   });

   type User = z.infer<typeof UserSchema>;
   ```

3. Form Validation:
   Use Zod to validate form inputs in your Next.js pages or components:

   ```typescript
   import { useState } from 'react';
   import { z } from 'zod';

   const FormSchema = z.object({
     username: z.string().min(3).max(20),
     password: z.string().min(8),
   });

   export default function LoginForm() {
     const [errors, setErrors] = useState<z.ZodIssue[]>([]);

     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
       event.preventDefault();
       const formData = new FormData(event.currentTarget);
       const result = FormSchema.safeParse({
         username: formData.get('username'),
         password: formData.get('password'),
       });

       if (!result.success) {
         setErrors(result.error.issues);
       } else {
         // Handle successful form submission
         console.log(result.data);
       }
     };

     return (
       <form onSubmit={handleSubmit}>
         {/* Form fields */}
         {errors.map((error) => (
           <p key={error.path.join('.')}>{error.message}</p>
         ))}
       </form>
     );
   }
   ```

4. API Route Validation:
   Use Zod to validate incoming requests in your Next.js API routes:

   ```typescript
   import { NextApiRequest, NextApiResponse } from 'next';
   import { z } from 'zod';

   const RequestSchema = z.object({
     id: z.string().uuid(),
     data: z.object({
       title: z.string(),
       content: z.string(),
     }),
   });

   export default function handler(req: NextApiRequest, res: NextApiResponse) {
     if (req.method !== 'POST') {
       return res.status(405).end();
     }

     const result = RequestSchema.safeParse(req.body);

     if (!result.success) {
       return res.status(400).json({ errors: result.error.issues });
     }

     // Process the validated data
     const { id, data } = result.data;
     // ...

     res.status(200).json({ message: 'Success' });
   }
   ```

5. Integration with Next.js API Routes:
   You can also use Zod with libraries like `next-validations` for more streamlined API route validation:

   ```typescript
   import { createValidator } from 'next-validations';
   import { z } from 'zod';

   const validate = createValidator();

   const schema = z.object({
     name: z.string(),
     email: z.string().email(),
   });

   export default validate({ body: schema }, (req, res) => {
     // Your handler logic here
     res.status(200).json({ message: 'Valid request' });
   });
   ```

By using Zod in your Next.js application, you can ensure type safety and robust validation throughout your frontend and backend code.
