'use server'

import {z} from 'zod'

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

  console.log(sendingData)
}