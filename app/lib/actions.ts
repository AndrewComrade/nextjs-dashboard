'use server'

import {z} from 'zod'
import {sql} from "@vercel/postgres";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['paid', 'oending']),
  date: z.string()
})

const CreateInvoice = FormSchema.omit({id: true, date: true})

export const createInvoice = async (formData: FormData) => {
  const sendingData = Object.fromEntries(formData.entries())
  const {customerId, status, amount} = CreateInvoice.parse(sendingData)
  const amountInCents = amount * 100
  const date = new Date().toISOString().split('T')[0]

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export const updateInvoice = async (id: string, formData: FormData) => {
  const sendingData = Object.fromEntries(formData.entries())
  const {customerId, status, amount} = UpdateInvoice.parse(sendingData)
  const amountInCents = amount * 100

  console.log(id)

  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}